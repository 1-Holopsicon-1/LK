import axios from 'axios'

import getToken from '@shared/lib/token'

import { CardRequestData, CardRequestResponse, CardRequestSubmitData } from './types'

const API_BASE_URL = '/api'

export const cardRequestApi = {
    getCardRequest: async (): Promise<CardRequestData | null> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/?getUsedBank&token=${getToken()}`)
            let data = null

            if (response.data && typeof response.data === 'object') {
                if (Array.isArray(response.data) && response.data.length > 0) {
                    data = response.data[0]
                } else if (response.data.success && response.data.data) {
                    data = response.data.data
                } else if (
                    response.data.file !== undefined ||
                    response.data.additionalBank !== undefined ||
                    response.data.createdAt !== undefined
                ) {
                    data = response.data
                } else if (response.data === null || Object.keys(response.data).length === 0) {
                    data = null
                } else if (Array.isArray(response.data) && response.data.length === 0) {
                    data = null
                }
            }

            return data
        } catch (error) {
            console.error('Error fetching card request:', error)
            return null
        }
    },

    submitCardRequest: async (data: CardRequestSubmitData): Promise<CardRequestResponse> => {
        try {
            const formData = new FormData()
            formData.set('accept', data.accept.toString())
            if (data.additionalBank) {
                formData.set('additionalBank', data.additionalBank)
            }
            formData.set('token', getToken())

            const response = await axios.post(`${API_BASE_URL}/?setUsedBank&token=${getToken()}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.data && typeof response.data === 'object') {
                if (response.data.success !== undefined) {
                    return response.data
                } else {
                    return {
                        success: true,
                        data: response.data,
                        message: 'Заявление успешно подано',
                    }
                }
            }
            return {
                success: true,
                data: response.data,
                message: 'Заявление успешно подано',
            }
        } catch (error) {
            console.error('Error submitting card request:', error)
            throw new Error('Ошибка при отправке заявления')
        }
    },

    downloadDocument: async (): Promise<void> => {
        try {
            const cardRequest = await cardRequestApi.getCardRequest()
            if (!cardRequest?.file) {
                throw new Error('Файл документа не найден')
            }

            const link = document.createElement('a')
            link.href = cardRequest.file
            link.download = 'used-bank-request.pdf'
            link.target = '_blank'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error('Error downloading document:', error)
            throw new Error('Ошибка при скачивании документа')
        }
    },
}
