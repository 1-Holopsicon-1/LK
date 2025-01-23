import React, { memo } from 'react'

import Subtext from '@shared/ui/subtext'
import styled from 'styled-components'

const OrderList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const OrderItem = styled.div``

interface Props {
    orders: string[]
}

const Orders = ({ orders }: Props) => {
    return (
        <OrderList>
            {!orders?.length && <Subtext>Нет приказов</Subtext>}
            {orders?.map((order) => <OrderItem key={order}>{order}</OrderItem>)}
        </OrderList>
    )
}

export default memo(Orders)
