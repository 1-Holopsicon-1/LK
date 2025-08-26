import { CardRequestData, CardRequestResponse, CardRequestSubmitData } from './types'

// Заглушка для тестирования API
export class CardRequestMockApi {
    private static storage: CardRequestData | null = null

    static async getCardRequest(): Promise<CardRequestData | null> {
        // Имитируем задержку сети
        await new Promise(resolve => setTimeout(resolve, 500))

        return this.storage
    }

    static async submitCardRequest(data: CardRequestSubmitData): Promise<CardRequestResponse> {
        // Имитируем задержку сети
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Создаем новое заявление
        this.storage = {
            bank: data.bank,
            status: 'processing',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        // Имитируем смену статуса на "ready" через 5 секунд
        setTimeout(() => {
            if (this.storage && this.storage.bank === data.bank) {
                this.storage.status = 'ready'
                this.storage.updated_at = new Date().toISOString()
            }
        }, 5000)

        return {
            success: true,
            data: this.storage,
            message: 'Заявление успешно подано'
        }
    }

    static async downloadDocument(): Promise<void> {
        // Имитируем задержку сети
        await new Promise(resolve => setTimeout(resolve, 500))

        if (!this.storage || this.storage.status !== 'ready') {
            throw new Error('Документ не готов для скачивания')
        }

        // Создаем фиктивный PDF blob
        const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(Card Request Document) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f
0000000015 00000 n
0000000068 00000 n
0000000125 00000 n
0000000214 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
308
%%EOF`

        const blob = new Blob([pdfContent], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `card-request-${this.storage.bank}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    }

    // Метод для сброса состояния (для тестирования)
    static reset(): void {
        this.storage = null
    }

    // Метод для установки статуса (для тестирования)
    static setStatus(status: 'processing' | 'ready' | null): void {
        if (this.storage) {
            this.storage.status = status
            this.storage.updated_at = new Date().toISOString()
        }
    }
}

// Экспортируем функции в том же формате, что и основное API
export const cardRequestMockApi = {
    getCardRequest: () => CardRequestMockApi.getCardRequest(),
    submitCardRequest: (data: CardRequestSubmitData) => CardRequestMockApi.submitCardRequest(data),
    downloadDocument: () => CardRequestMockApi.downloadDocument()
}
