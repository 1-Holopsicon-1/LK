import React, { useState } from 'react'

import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useGate, useStoreMap, useUnit } from 'effector-react'

import {
    ArticleApplicationDetailed,
    ArticleApplicationStatus,
    ArticleApplicationStatuses,
    scienceApi,
} from '@shared/api/science'
import { Colors } from '@shared/consts'
import { Button, CenterPage, Error, Input, Loading, Message, TextArea, Title } from '@shared/ui/atoms'
import Flex from '@shared/ui/flex'
import useCurrentDevice from '@shared/ui/hooks/use-current-device'
import { useModal } from '@shared/ui/modal'
import PageBlock from '@shared/ui/page-block'
import Subtext from '@shared/ui/subtext'

import * as model from './model'

const ArticleApplicationsAdmin = () => {
    useGate(model.ArticleApplicationsAdminGate)

    const articleApplications = useStoreMap(model.$articleApplications, (articleApplications) =>
        articleApplications.map((articleApplication) => ({
            ...articleApplication,
            status: ArticleApplicationStatuses[articleApplication.status],
        })),
    )

    const { open } = useModal()
    const [pageLoading, roles] = useUnit([model.pageLoading, scienceApi.getRolesQuery.$data])

    const isScienceAdmin = roles?.Data.Apps.Science.Roles.find((role) => role.Name === 'Admin')

    return (
        <CenterPage padding="10px">
            <PageBlock>
                <Flex d="column" ai="flex-start" gap="1rem">
                    {pageLoading ? (
                        <Flex jc="center" style={{ minHeight: '200px' }}>
                            <Loading />
                        </Flex>
                    ) : articleApplications.length > 0 ? (
                        articleApplications.map((application) => (
                            <Flex
                                key={application.id}
                                d="column"
                                ai="flex-start"
                                gap="0.5rem"
                                brad="1rem"
                                style={{
                                    backgroundColor: 'var(--block-content)',
                                    border: '1px solid var(--blockBorder)',
                                }}
                                p="1rem"
                                cursor="pointer"
                                onClick={() => {
                                    model.applicationOpened()
                                    open(<ApplicationModal applicationId={application.id} />, 'Информация о заявке')
                                }}
                            >
                                <Title align="left" size={4}>
                                    {application.article.title}
                                </Title>
                                {isScienceAdmin && (
                                    <Message
                                        width="fit-content"
                                        type={
                                            application.status === 'Принято'
                                                ? 'success'
                                                : application.status === 'Отклонено'
                                                  ? 'failure'
                                                  : 'alert'
                                        }
                                        title={application.status || '—'}
                                        align="center"
                                        icon={null}
                                    />
                                )}
                                <Subtext>
                                    Дата подачи:{' '}
                                    {format(new Date(application.createdAt), 'dd MMMM yyyy, HH:mm', { locale: ru })}
                                </Subtext>
                            </Flex>
                        ))
                    ) : (
                        <Error text="Нет заявок" />
                    )}
                </Flex>
            </PageBlock>
        </CenterPage>
    )
}

const ApplicationModal = ({ applicationId }: { applicationId: string }) => {
    useGate(model.ApplicationGate, { applicationId })
    const { isMobile } = useCurrentDevice()
    const { close, open } = useModal()
    const [fraction, setFraction] = useState('')
    const [articleApplication, approve, applicationsLoading] = useUnit([
        model.$articleApplication,
        model.approve,
        model.$applicationsLoading,
    ])
    const [roles] = useUnit([scienceApi.getRolesQuery.$data])

    const isScienceAdmin = roles?.Data.Apps.Science.Roles.find((role) => role.Name === 'Admin')

    if (!articleApplication) {
        return (
            <Flex jc="center" style={{ minHeight: '200px' }}>
                <Loading />
            </Flex>
        )
    }

    return (
        <Flex d="column" gap="1rem" style={{ minWidth: '300px' }} w="100%" ai="flex-start" mw="600px">
            <Subtext align="left">Название: {articleApplication.article.title}</Subtext>
            <Subtext align="left">
                Автор заявки:{' '}
                <span
                    style={{
                        color: articleApplication.authorsFractionShares?.some((author) => author.isApplyingAuthor)
                            ? Colors.green.main
                            : 'unset',
                    }}
                >
                    {articleApplication.author.fullName}
                </span>
            </Subtext>
            {articleApplication.authorsFractionShares && (
                <Authors authorsFractionShares={articleApplication.authorsFractionShares} />
            )}
            <Subtext>
                Дата подачи: {format(new Date(articleApplication.createdAt), 'dd MMMM yyyy, HH:mm', { locale: ru })}
            </Subtext>
            <Flex ai="flex-start" gap="1rem">
                <Subtext align="left">Статус:</Subtext>
                <StatusTree
                    acceptanceChain={articleApplication.acceptanceChain}
                    declineReason={articleApplication.declineReason}
                    status={articleApplication.status}
                    applicationId={articleApplication.id}
                />
            </Flex>
            {articleApplication.status !== 'Accepted' && articleApplication.status !== 'Declined' && (
                <Flex gap="1rem">
                    {articleApplication.status === 'AdminReview' ? (
                        <Flex d="column" gap="0.5rem" ai="flex-start">
                            <Title align="left" size={5}>
                                Укажите фракционную долю автора
                            </Title>
                            <Input
                                value={fraction}
                                setValue={setFraction}
                                placeholder="Фракционная доля"
                                type="number"
                                width="100%"
                                maxWidth="100%"
                            />
                            <Flex gap="0.25rem">
                                <Button
                                    text="Отказать"
                                    textColor={Colors.red.main}
                                    hoverBackground={Colors.red.transparent3}
                                    onClick={() => {
                                        open(<DeclineModal applicationId={articleApplication.id} />, 'Отказать')
                                    }}
                                    width="100%"
                                />
                                <Button
                                    text="Подтвердить"
                                    loading={applicationsLoading.get(applicationId) === 'approving'}
                                    textColor={Colors.green.main}
                                    background={Colors.green.transparent3}
                                    onClick={() => {
                                        approve({ id: applicationId, fractionShare: Number(fraction) })
                                    }}
                                    width="100%"
                                    isActive={!!fraction}
                                    notActiveClickMessage="Введите фракционную долю"
                                />
                            </Flex>
                        </Flex>
                    ) : (
                        <Flex gap="0.25rem">
                            <Button
                                text="Отказать"
                                textColor={Colors.red.main}
                                hoverBackground={Colors.red.transparent3}
                                onClick={() => {
                                    open(<DeclineModal applicationId={articleApplication.id} />, 'Отказать')
                                }}
                                width="100%"
                            />
                            {(!isScienceAdmin || isMobile) && (
                                <Button
                                    text="Подтвердить"
                                    loading={applicationsLoading.get(applicationId) === 'approving'}
                                    textColor={Colors.green.main}
                                    background={Colors.green.transparent3}
                                    onClick={() => {
                                        approve({ id: applicationId, fractionShare: null })
                                        if (!isScienceAdmin) close()
                                    }}
                                    width="100%"
                                />
                            )}
                        </Flex>
                    )}
                </Flex>
            )}
        </Flex>
    )
}

const StatusTree = ({
    status,
    acceptanceChain,
    declineReason,
    applicationId,
}: {
    status: ArticleApplicationStatus
    acceptanceChain: ArticleApplicationDetailed['acceptanceChain']
    declineReason: ArticleApplicationDetailed['declineReason']
    applicationId: string
}) => {
    const { isMobile } = useCurrentDevice()
    const [roles] = useUnit([scienceApi.getRolesQuery.$data])
    const [approve, applicationsLoading] = useUnit([model.approve, model.$applicationsLoading])

    const isScienceAdmin = roles?.Data.Apps.Science.Roles.find((role) => role.Name === 'Admin')

    if (status === 'Accepted')
        return (
            <Message
                width="fit-content"
                type={'success'}
                title={ArticleApplicationStatuses.Accepted}
                align="center"
                icon={null}
            />
        )

    if (status === 'Declined')
        return (
            <Message
                width="fit-content"
                type={'failure'}
                title={ArticleApplicationStatuses.Declined}
                align="left"
                icon={null}
            >
                {declineReason}
            </Message>
        )

    return (
        <Flex d="column" ai="flex-start" gap="0.25rem">
            <Flex jc="space-between">
                <Message
                    width={isMobile ? '100%' : 'fit-content'}
                    type={acceptanceChain.headOfDepartment?.isApproved ? 'success' : 'alert'}
                    title={ArticleApplicationStatuses.HeadOfDepartmentReview}
                    align="center"
                    icon={null}
                />
                {isScienceAdmin && !acceptanceChain.headOfDepartment?.isApproved && !isMobile && (
                    <Button
                        text="Подтвердить"
                        loading={applicationsLoading.get(applicationId) === 'approving'}
                        textColor={Colors.green.main}
                        background={Colors.green.transparent3}
                        onClick={() => {
                            approve({ id: applicationId, fractionShare: null })
                        }}
                    />
                )}
            </Flex>
            <Flex jc="space-between">
                <Message
                    width={isMobile ? '100%' : 'fit-content'}
                    type={
                        acceptanceChain.deanOrDeputyDean?.isApproved
                            ? 'success'
                            : acceptanceChain.headOfDepartment?.isApproved
                              ? 'alert'
                              : 'tip'
                    }
                    title={ArticleApplicationStatuses.DeanOrDeputyDeanReview}
                    align="center"
                    icon={null}
                />
                {isScienceAdmin &&
                    acceptanceChain.headOfDepartment?.isApproved &&
                    !acceptanceChain.deanOrDeputyDean?.isApproved &&
                    !isMobile && (
                        <Button
                            text="Подтвердить"
                            loading={applicationsLoading.get(applicationId) === 'approving'}
                            textColor={Colors.green.main}
                            background={Colors.green.transparent3}
                            onClick={() => {
                                approve({ id: applicationId, fractionShare: null })
                            }}
                        />
                    )}
            </Flex>
            <Message
                width={isMobile ? '100%' : 'fit-content'}
                type={
                    acceptanceChain.admin?.isApproved
                        ? 'success'
                        : acceptanceChain.deanOrDeputyDean?.isApproved
                          ? 'alert'
                          : 'tip'
                }
                title={ArticleApplicationStatuses.AdminReview}
                align="center"
                icon={null}
            />
        </Flex>
    )
}

const Authors = ({
    authorsFractionShares,
}: {
    authorsFractionShares: ArticleApplicationDetailed['authorsFractionShares']
}) => {
    return (
        <Subtext align="left">
            Авторы:{' '}
            {authorsFractionShares?.map((author, index) => (
                <span key={index} style={{ color: author.isApplyingAuthor ? Colors.green.main : 'unset' }}>
                    {author.authorName} ({author.fractionShare}){index !== authorsFractionShares?.length - 1 && ', '}
                </span>
            ))}
        </Subtext>
    )
}

const DeclineModal = ({ applicationId }: { applicationId: string }) => {
    const { back } = useModal()
    const [value, setValue] = useState('')
    const [decline, applicationsLoading] = useUnit([model.decline, model.$applicationsLoading])

    return (
        <Flex d="column" gap="1rem" style={{ minWidth: '300px' }} w="400px" mw="100%">
            <Title align="left" size={5} style={{ marginBottom: '0.5rem' }}>
                Укажите причину
            </Title>
            <TextArea value={value} setValue={setValue} placeholder="Причина отказа" rows={4} />
            <Flex gap="0.25rem">
                <Button text="Закрыть" textColor="var(--text)" onClick={back} width="100%" />
                <Button
                    text="Отказать"
                    loading={applicationsLoading.get(applicationId) === 'approving'}
                    textColor={Colors.red.main}
                    hoverBackground={Colors.red.transparent3}
                    onClick={() => {
                        decline({ id: applicationId, declineReason: value })
                        back()
                    }}
                    width="100%"
                    isActive={!!value}
                    notActiveClickMessage="Введите причину отказа"
                />
            </Flex>
        </Flex>
    )
}

export default ArticleApplicationsAdmin

// <Link
//     to={ARTICLE.replace(':id', application.articleId)}
//     style={{
//         color: 'var(--text)',
//     }}
// >
//     <Title align="left" size={4}>
//         {application.article.title}
//     </Title>
// </Link>
