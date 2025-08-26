import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

import { userModel } from '@shared/session'
import { Button } from '@shared/ui/button'
import { Message } from '@shared/ui/message'
import PageBlock from '@shared/ui/page-block'
import { Title } from '@shared/ui/title'

import { BANK_OPTIONS, type BankOption } from '../api/types'
import { cardRequestModel } from '../model'

const CardRequestWrapper = styled.div``

const FormCard = styled.div``

const ApplicationText = styled.div``

const BankOptions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 16px 0;
`

const BankOption = styled.label<{ selected: boolean }>``

const StatusCard = styled.div``

const ButtonGroup = styled.div``

const CardRequestForm: React.FC = () => {
    const { cardRequest, isLoading, error, submitRequest, downloadDocument, getRequest } =
        cardRequestModel.selectors.useCardRequest()
    const {
        data: { user },
    } = userModel.selectors.useUser()
    const [selectedBank, setSelectedBank] = useState<string>('')

    // Проверяем, доступна ли форма (до 1 октября)
    const isFormAvailable = () => {
        const now = new Date()
        const cutoffDate = new Date(now.getFullYear(), 9, 1) // 1 октября (месяцы начинаются с 0)
        return now < cutoffDate
    }

    const canSubmitForm = isFormAvailable()

    useEffect(() => {
        getRequest()
    }, [])

    const handleBankChange = (bankId: string) => {
        setSelectedBank(bankId)
    }

    const handleSubmit = () => {
        if (!selectedBank) return

        submitRequest({
            bank: selectedBank,
        })
    }

    const handleDownload = () => {
        downloadDocument()
    }

    const getStatusDisplay = () => {
        if (!cardRequest?.status) return null

        switch (cardRequest.status) {
            case 'processing':
                return (
                    <div className="status-content">
                        <span className="status-icon" style={{ color: 'var(--orange)', fontSize: '24px' }}>
                            ⏱️
                        </span>
                        <span className="status-text">Заявление обрабатывается</span>
                    </div>
                )
            case 'ready':
                return (
                    <div className="status-content">
                        <span className="status-icon" style={{ color: 'var(--green)', fontSize: '24px' }}>
                            ✅
                        </span>
                        <span className="status-text">Документ готов к скачиванию</span>
                    </div>
                )
            default:
                return null
        }
    }

    const getSelectedBankName = () => {
        const bank = BANK_OPTIONS.find((b) => b.id === cardRequest?.bank)
        return bank?.name || cardRequest?.bank
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
                {cardRequest && (
                    <StatusCard>
                        <Title size={4} bottomGap="16px">
                            Статус заявления
                        </Title>

                        {getStatusDisplay()}

                        {cardRequest.bank && (
                            <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                                Выбранный банк: <strong>{getSelectedBankName()}</strong>
                            </p>
                        )}

                        {cardRequest.status === 'ready' && (
                            <Button
                                onClick={handleDownload}
                                text="📥 Скачать документ"
                                background="var(--green)"
                                textColor="white"
                                loading={isLoading}
                            />
                        )}
                    </StatusCard>
                )}

                {/* Форма подачи заявления */}
                {canSubmitForm && (
                    <FormCard>
                        <Title size={4} bottomGap="16px">
                            {cardRequest ? 'Подать новое заявление' : 'Подача заявления'}
                        </Title>

                        <ApplicationText>
                            Я, {user?.fullName || '[ФИО]'}, согласен на выпуск банковской карты выбранного банка.
                        </ApplicationText>

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
                                    <input
                                        type="radio"
                                        name="bank"
                                        value={bank.id}
                                        checked={selectedBank === bank.id}
                                        onChange={() => handleBankChange(bank.id)}
                                    />
                                    {bank.name}
                                </BankOption>
                            ))}
                        </BankOptions>

                        <ButtonGroup>
                            <Button
                                onClick={handleSubmit}
                                text="📄 Отправить заявление"
                                background="var(--reallyBlue)"
                                textColor="white"
                                loading={isLoading}
                                isActive={!!selectedBank}
                                notActiveClickMessage="Пожалуйста, выберите банк"
                            />
                        </ButtonGroup>

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
