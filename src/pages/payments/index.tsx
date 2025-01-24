import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { TAX_CERTIFICATE_ROUTE } from '@app/routes/routes'
import { paymentsModel } from '@entities/payments'
import { popUpMessageModel } from '@entities/pop-up-message'
import PaymentsWidget from '@features/home/ui/molecules/payments-widget'
import PageBlock from '@shared/ui/page-block'
import { Error, Message, Wrapper } from '@ui/atoms'
import { useUnit } from 'effector-react'
import styled from 'styled-components'
import { SliderPage } from 'widgets'

import PaymentsTemplate from './payments-template'

const PaymentsPage = () => {
    const [
        error,
        loading,
        payments,
        paymentType,
        contractsWithDebtDorm,
        contractsWithoutDebtDorm,
        contractsWithDebtEdu,
        contractsWithoutDebtEdu,
    ] = useUnit([
        paymentsModel.stores.$error,
        paymentsModel.stores.$loading,
        paymentsModel.stores.$paymentsStore,
        paymentsModel.stores.paymentType,
        paymentsModel.stores.contractsWithDebtDorm,
        paymentsModel.stores.contractsWithoutDebtDorm,
        paymentsModel.stores.contractsWithDebtEdu,
        paymentsModel.stores.contractsWithoutDebtEdu,
    ])

    useEffect(() => {
        popUpMessageModel.events.evokePopUpMessage({
            type: 'alert',
            time: 10000,
            message: 'В связи с техническими работами отображение данных по произведенным оплатам может быть не полным',
        })
    }, [])

    return (
        <Wrapper
            loading={loading}
            load={paymentsModel.effects.getPaymentsFx}
            error={error}
            data={payments}
            noDataCheck={!payments?.dormitory.length}
        >
            <PageBlock>
                <Message type={'alert'} title="Внимание!">
                    Ведутся доработки по информации о долге по оплате и суммам оплат
                </Message>
                {paymentType !== 'none' && (
                    <>
                        <PaymentsWidget fullWidth />
                        <Link to={TAX_CERTIFICATE_ROUTE}>
                            Заказать справку по оплате образовательных услуг для представления в налоговый орган
                        </Link>
                    </>
                )}
                {paymentType === 'none' && <Error text="Нет данных" />}
                {paymentType === 'both' && (
                    <SliderPage
                        pages={[
                            {
                                title: 'Общежитие',
                                content: (
                                    <PaymentsTemplate
                                        contractsWithDebt={contractsWithDebtDorm}
                                        contractsWithoutDebt={contractsWithoutDebtDorm}
                                    />
                                ),
                            },
                            {
                                title: 'Обучение',
                                content: (
                                    <PaymentsTemplate
                                        contractsWithDebt={contractsWithDebtEdu}
                                        contractsWithoutDebt={contractsWithoutDebtEdu}
                                    />
                                ),
                            },
                        ]}
                        appearance={false}
                    />
                )}
                {paymentType === 'dormitory' && (
                    <PaymentsTemplate
                        contractsWithDebt={contractsWithDebtDorm}
                        contractsWithoutDebt={contractsWithoutDebtDorm}
                    />
                )}
                {paymentType === 'education' && (
                    <PaymentsTemplate
                        contractsWithDebt={contractsWithDebtEdu}
                        contractsWithoutDebt={contractsWithoutDebtEdu}
                    />
                )}
            </PageBlock>
        </Wrapper>
    )
}

const Link = styled(RouterLink)`
    font-size: clamp(0.75rem, 0.688rem + 0.313vw, 1rem);
`

export default PaymentsPage
