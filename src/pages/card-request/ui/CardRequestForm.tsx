import React, { useEffect, useState } from 'react'
import { FiCheck, FiDownload } from 'react-icons/fi'

import styled from 'styled-components'

import { userModel } from '@shared/session'
import { Error, LinkButton } from '@shared/ui/atoms'
import { Button } from '@shared/ui/button'
import Flex from '@shared/ui/flex'
import { Message } from '@shared/ui/message'
import PageBlock from '@shared/ui/page-block'
import { Title } from '@shared/ui/title'

import { BANK_OPTIONS, type BankOption, cardRequestUtils } from '../api/types'
import { cardRequestModel } from '../model'

const getBankIcon = cardRequestUtils.getBankIcon
const getBankName = cardRequestUtils.getBankName

const CardRequestWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;

    @media (max-width: 768px) {
        padding: 16px;
        gap: 16px;
    }
`

const FormCard = styled.div`
    padding: 24px;

    border-radius: var(--brLight);
    border: 0% solid var(--theme-mild-opposite);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    @media (max-width: 768px) {
        padding: 16px;
    }
`

const ApplicationText = styled.div`
    border-radius: var(--brLight);
    padding: 20px;
    margin: 16px 0;
    color: var(--text);
    line-height: 1.8;
    font-size: 15px;

    .user-info {
        margin-bottom: 20px;
    }

    .request-text {
        margin-bottom: 16px;
    }

    .additional-request {
        margin: 16px 0;
        padding: 12px;
        background: var(--theme-2);
        border-radius: var(--brLight);
        border-left: 1px solid var(--reallyBlue);
    }

    .consent-text {
        margin-top: 20px;
        font-style: italic;
    }
`

const BankOptions = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
    margin: 16px 0;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }
`

const BankSection = styled.div`
    margin: 24px 0;
    padding: 20px;
    background: var(--block-content);
    border-radius: var(--brLight);
    background: rgba(186, 192, 255, 0.09);
`

const BankOption = styled.div<{ selected: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 12px;
    border-radius: var(--brLight);
    border: 0 solid ${({ selected }) => (selected ? 'var(--reallyBlue)' : 'var(--theme-mild-opposite)')};
    background: shadow;
    background: ${({ selected }) => (selected ? 'var(--reallyBlue)' : 'var(--block-content)')};
    color: ${({ selected }) => (selected ? 'white' : 'var(--text)')};
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    min-height: 120px;

    &:hover {
        border-color: var(--reallyBlue);
        background: ${({ selected }) => (selected ? 'var(--reallyBlue)' : 'var(--block-content)')};
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    input[type='checkbox'] {
        display: none;
    }

    .bank-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        border-radius: 12px;
        background: ${({ selected }) => (selected ? 'rgba(255, 255, 255, 0.2)' : 'var(--theme-mild)')};
    }

    .bank-name {
        font-weight: 500;
        font-size: 0.95rem;
        line-height: 1.2;
    }

    @media (max-width: 768px) {
        padding: 16px 8px;
        min-height: 100px;

        .bank-icon {
            width: 50px;
            height: 50px;
            margin-bottom: 8px;
        }

        .bank-name {
            font-size: 0.85rem;
        }
    }
`

const StatusCard = styled.div`
    margin-top: 24px;
    padding: 24px;
    background: var(--block-content);
    border-radius: var(--brLight);
    border: 0px solid var(--theme-mild-opposite);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
`

const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const CardRequestForm: React.FC = () => {
    const { cardRequest, isLoading, error, submitRequest, getRequest } = cardRequestModel.selectors.useCardRequest()
    const {
        data: { user },
    } = userModel.selectors.useUser()

    const [selectedBank, setSelectedBank] = useState<string>(cardRequest?.selectedBank || '')

    // Проверяем, доступна ли форма (до 1 октября)
    const isFormAvailable = () => {
        const now = new Date()
        const cutoffDate = new Date(now.getFullYear(), 9, 1) // 1 октября (месяцы начинаются с 0)
        return now < cutoffDate
    }

    const canSubmitForm = isFormAvailable()

    // Заглушка блок по почте
    const allowedEmails = [
        'l.m.lukyanov@mospolytech.ru',
        'a.s.zhuplev@mospolytech.ru',
        'mfnbrx@gmail.com',
        't.t.testov@mospolytech.ru',
    ]
    /*
    if (user?.email && !allowedEmails.includes(user.email)) {
        return <Error text={'Данный раздел находится в разработке или не доступен для вас'} />
    }
     */
    useEffect(() => {
        getRequest()
    }, [])

    useEffect(() => {
        if (cardRequest?.selectedBank) {
            setSelectedBank(cardRequest.selectedBank)
        }
    }, [cardRequest?.selectedBank])

    const handleBankChange = (bankId: string) => {
        setSelectedBank(bankId)
    }

    const handleSubmit = () => {
        submitRequest({
            accept: true,
            selectedBank: selectedBank,
        })

        setTimeout(() => {
            getRequest()
        }, 1000)
    }

    const getSelectedBankName = () => {
        return selectedBank ? getBankName(selectedBank) : '[банк не выбран]'
    }

    const hasSelectedBank = () => {
        return Boolean(
            cardRequest?.selectedBank &&
                cardRequest.selectedBank !== '' &&
                cardRequest?.selectedBank !== 'null' &&
                cardRequest?.selectedBank !== null &&
                cardRequest.selectedBank.trim() !== '',
        )
    }

    return (
        <PageBlock>
            <CardRequestWrapper>
                {error && (
                    <Message type="failure" title="Ошибка">
                        {error}
                    </Message>
                )}

                {/* Статус текущего заявления */}
                {cardRequestUtils.hasRequest(cardRequest) && (cardRequest.file || cardRequest.createdAt) && (
                    <StatusCard>
                        <Title size={4} bottomGap="16px">
                            Статус заявления
                        </Title>

                        <div style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
                            <p style={{ marginBottom: '8px' }}>
                                Выбранный банк:{' '}
                                {cardRequest.selectedBank ? (
                                    <>
                                        <img
                                            src={getBankIcon(cardRequest.selectedBank)}
                                            alt={cardRequest.selectedBank}
                                            style={{ width: '24px', height: '24px', marginLeft: '8px' }}
                                        />{' '}
                                        <strong>{getBankName(cardRequest.selectedBank)}</strong>
                                    </>
                                ) : (
                                    <strong>[банк не выбран]</strong>
                                )}
                            </p>
                        </div>

                        <Flex gap="8px">
                            {cardRequestUtils.isReady(cardRequest) && (
                                <LinkButton
                                    href={cardRequest.file || '#'}
                                    onClick={() => null}
                                    text="Скачать согласие"
                                    width="100%"
                                    minHeight="38px"
                                    height="38px"
                                    icon={<FiDownload />}
                                />
                            )}
                            <Message
                                type={'success'}
                                icon={<FiCheck />}
                                title={'Успешно подписано'}
                                visible={cardRequestUtils.isReady(cardRequest)}
                                align="center"
                            />
                        </Flex>
                    </StatusCard>
                )}

                {/* Форма подачи заявления */}
                {canSubmitForm && (
                    <FormCard>
                        <Title size={4} bottomGap="16px">
                            {cardRequest ? 'Подать новое заявление' : 'Подача заявления'}
                        </Title>

                        <ApplicationText>
                            <div className="user-info">
                                Я,{' '}
                                {user?.surname && user?.name && user?.patronymic
                                    ? `${user.surname} ${user.name} ${user.patronymic}`
                                    : '[ФИО]'}
                                ,<br />
                                Паспорт: {user?.passSer && user?.passNum ? `${user.passSer} ${user.passNum}` : 'скрыто'}
                                <br />
                                Дата рождения:{' '}
                                {
                                    /*{user?.birthday ? new Date(user.birthday).toLocaleDateString('ru-RU') : 'скрыто'}*/ 'скрыто'
                                }
                                <br />
                                Номер мобильного телефона: {user?.phone || '[телефон]'}
                                <br />
                                Адрес электронной почты: {user?.email || '[email]'}
                            </div>

                            <div className="request-text">
                                Для перечисления причитающихся мне денежных средств (стипендий, материальной поддержки и
                                других выплат) прошу Вас отправить заявку на оформление банковской карты НСПК «МИР» в
                                рамках зарплатного проекта с банком{' '}
                                {selectedBank ? (
                                    <>
                                        <img
                                            src={getBankIcon(selectedBank)}
                                            alt={selectedBank}
                                            style={{ width: '20px', height: '20px', marginLeft: '4px' }}
                                        />{' '}
                                        {getBankName(selectedBank)}
                                    </>
                                ) : (
                                    '[выберите банк]'
                                )}
                            </div>

                            <div className="consent-text">
                                Подтверждаю предоставленное мною при приеме на обучение в Московский Политех согласие на
                                обработку персональных данных, в том числе их передачу в банк{' '}
                                {selectedBank ? (
                                    <>
                                        <img
                                            src={getBankIcon(selectedBank)}
                                            alt={selectedBank}
                                            style={{ width: '20px', height: '20px', marginLeft: '4px' }}
                                        />{' '}
                                        {getBankName(selectedBank)}
                                    </>
                                ) : (
                                    '[выберите банк]'
                                )}{' '}
                                в целях оформления банковской карты.
                            </div>
                        </ApplicationText>

                        <BankSection>
                            <Title size={5} bottomGap="12px">
                                Выберите банк:
                            </Title>
                            <BankOptions>
                                {BANK_OPTIONS.map((bank) => (
                                    <BankOption
                                        key={bank.id}
                                        selected={selectedBank === bank.id}
                                        onClick={() => handleBankChange(bank.id)}
                                    >
                                        <div className="bank-icon">
                                            <img
                                                src={getBankIcon(bank.id)}
                                                alt={bank.id}
                                                style={{ width: '40px', height: '40px' }}
                                            />
                                        </div>
                                        <div className="bank-name">{bank.name}</div>
                                    </BankOption>
                                ))}
                            </BankOptions>
                        </BankSection>

                        <ButtonGroup>
                            <Button
                                onClick={handleSubmit}
                                text="Отправить заявление"
                                background="var(--reallyBlue)"
                                textColor="white"
                                loading={isLoading}
                                isActive={!!selectedBank}
                                notActiveClickMessage="Сначала выберите банк"
                                width="100%"
                            />
                        </ButtonGroup>
                        <br />
                        {cardRequest && (
                            <Message type="info" title="Информация">
                                Подача нового заявления перезапишет предыдущее.
                            </Message>
                        )}
                    </FormCard>
                )}

                {/* Сообщение о недоступности формы после 1 октября */}
                {!canSubmitForm && !cardRequest && (
                    <Message type="failure" title="Форма недоступна">
                        Подача заявлений на выпуск банковских карт завершена (доступна до 1 октября).
                    </Message>
                )}
            </CardRequestWrapper>
        </PageBlock>
    )
}

export default CardRequestForm
