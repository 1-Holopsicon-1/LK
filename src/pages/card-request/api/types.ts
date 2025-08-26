export interface CardRequestData {
    bank: string
    status: 'processing' | 'ready' | null
    created_at?: string
    updated_at?: string
}

export interface CardRequestSubmitData {
    bank: string
}

export interface CardRequestResponse {
    success: boolean
    data: CardRequestData
    message?: string
}

export type BankOption = {
    id: string
    name: string
}

export const BANK_OPTIONS: BankOption[] = [
    { id: 'sberbank', name: 'ПАО Сбербанк' },
    { id: 'vtb', name: 'Банк ВТБ (ПАО)' },
    { id: 'alfabank', name: 'АО Альфа-Банк' },
]
