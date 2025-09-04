export interface CardRequestData {
    file?: string
    selectedBank?: string // vtb|sber|alfa
    createdAt?: string
}

export interface CardRequestSubmitData {
    accept: boolean
    selectedBank?: string // vtb|sber|alfa
}

export interface CardRequestResponse {
    success?: boolean
    data?: CardRequestData | CardRequestData[]
    message?: string
}

export type CardRequestApiResponse = CardRequestData[] | CardRequestResponse

export type BankOption = {
    id: string
    name: string
}

export const BANK_OPTIONS: BankOption[] = [
    { id: 'vtb', name: 'Банк ВТБ (ПАО)' },
    { id: 'sber', name: 'ПАО Сбербанк' },
    { id: 'alfa', name: 'АО Альфа-Банк' },
]

export const cardRequestUtils = {
    isReady: (request: CardRequestData | null): boolean => {
        if (!request) return false
        const file = request.file
        if (!file || typeof file !== 'string') return false

        const trimmedFile = file.trim()
        if (trimmedFile === '') return false

        return (
            trimmedFile.startsWith('http') ||
            trimmedFile.startsWith('/') ||
            trimmedFile.includes('.php') ||
            trimmedFile.includes('.')
        )
    },

    isProcessing: (request: CardRequestData | null): boolean => {
        return Boolean(request && !cardRequestUtils.isReady(request))
    },

    hasRequest: (request: CardRequestData | null): boolean => {
        return Boolean(request)
    },

    getBankName: (bankId: string): string => {
        const bank = BANK_OPTIONS.find((b) => b.id === bankId)
        return bank?.name || bankId
    },

    getBankIcon: (bankId: string): string => {
        const icons: Record<string, string> = {
            vtb: '/bank-icons/vtb.svg',
            sber: '/bank-icons/sber.svg',
            alfa: '/bank-icons/alfa.svg',
        }
        return icons[bankId] || '🏦'
    },
}
