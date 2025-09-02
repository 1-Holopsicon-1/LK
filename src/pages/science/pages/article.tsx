import React, { useEffect, useState } from 'react'
import { FiEyeOff, FiPlus } from 'react-icons/fi'
import { useHistory, useParams } from 'react-router'

import { useUnit } from 'effector-react'

import { articleModel } from '@entities/science'
import { getDefaultColumns } from '@entities/science/lib/get-default-columns'

import { ARTICLE_APPLY } from '@shared/routing'
import { Button, Error } from '@shared/ui/atoms'
import Flex from '@shared/ui/flex'
import { useModal } from '@shared/ui/modal'
import PageBlock from '@shared/ui/page-block'
import Subtext from '@shared/ui/subtext'
import Table from '@shared/ui/table'
import { ColumnProps } from '@shared/ui/table/types'
import { Title } from '@shared/ui/title'

import { DetailsModal } from '../ui/details-modal'

const Article = () => {
    const { open } = useModal()
    const { id } = useParams<{ id: string }>()
    const history = useHistory()
    const [article, loading, pageMounted, getDetailsClicked] = useUnit([
        articleModel.stores.article,
        articleModel.stores.loading,
        articleModel.events.pageMounted,
        articleModel.events.getDetailsClicked,
    ])
    const [articleColumns, setArticleColumns] = useState<ColumnProps[]>(getDefaultColumns())

    useEffect(() => {
        pageMounted(id)
    }, [])

    const handleClick = () => {
        getDetailsClicked(id)
        open(<DetailsModal />, 'Полная информация о статье')
    }

    if (loading) return null

    if (!article) {
        return <Error size="60px" text="Ничего не было найдено" image={<FiEyeOff />} />
    }

    return (
        <PageBlock outerPadding="10px">
            <Flex ai="flex-start">
                <Title align="left" size={2}>
                    {article?.articleTitle}
                </Title>
                <Button
                    onClick={() => history.push(ARTICLE_APPLY.replace(':id', id))}
                    text="Заявить об&nbsp;авторстве"
                    background="var(--reallyBlue)"
                    textColor="#fff"
                    padding="1.5rem 1rem"
                    minWidth="150px"
                    icon={<FiPlus />}
                />
            </Flex>
            <Flex jc="space-between" ai="flex-start">
                <Subtext align="left">ID публикации: {article?.id}</Subtext>
                <Button
                    onClick={() => {
                        setArticleColumns((cols) => [
                            ...cols,
                            {
                                title: 'Новое поле',
                                field: '',
                                showFull: true,
                            },
                        ])
                    }}
                    text="Добавить поле"
                    background="var(--reallyBlue)"
                    textColor="#fff"
                    minWidth="150px"
                    height="36px"
                    icon={<FiPlus />}
                />
            </Flex>
            <Table loading={loading} columns={articleColumns} data={[article]} maxOnPage={7} />
            <Title align="left" size={2}>
                Список авторов из Московского Политеха
            </Title>
            <Table loading={loading} columns={columns} data={null} maxOnPage={7} />
            <Button
                onClick={() => {}}
                text="Добавить"
                background="var(--reallyBlue)"
                textColor="#fff"
                icon={<FiPlus />}
                minWidth="35px"
                height="36px"
                isActive={false}
            />
            <Flex w="100%" jc="center">
                <Button
                    onClick={handleClick}
                    text="Отобразить все поля данных"
                    background="var(--reallyBlue)"
                    textColor="#fff"
                    minWidth="35px"
                    height="36px"
                />
            </Flex>
        </PageBlock>
    )
}

const columns: ColumnProps[] = [
    {
        title: '№',
        field: 'index',
    },
    {
        title: 'Фамилия',
        field: 'surname',
    },
    {
        title: 'Имя',
        field: 'fistname',
    },
    {
        title: 'Отчество',
        field: 'patronymic',
    },
    {
        title: 'Структурное подразделение',
        field: 'division',
    },
    {
        title: 'Факультет',
        field: 'faculty',
    },
    {
        title: 'WoS researcherID',
        field: 'wosId',
    },
    {
        title: 'Scopus authorID',
        field: 'scopusId',
    },
]

export default Article
