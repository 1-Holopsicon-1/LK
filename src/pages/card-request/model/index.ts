import { createEffect, createEvent, createStore, sample } from 'effector'
import { useUnit } from 'effector-react'

import { cardRequestApi } from '../api/card-request-api-mock'
import { CardRequestData, CardRequestSubmitData } from '../api/types'

// Events
export const cardRequestSubmitted = createEvent<CardRequestSubmitData>()
export const documentDownloadRequested = createEvent()
export const cardRequestReset = createEvent()

// Effects
export const getCardRequestFx = createEffect<void, CardRequestData | null>(async () => {
    return await cardRequestApi.getCardRequest()
})

export const submitCardRequestFx = createEffect<CardRequestSubmitData, CardRequestData>(async (data) => {
    const response = await cardRequestApi.submitCardRequest(data)
    if (!response.success) {
        throw new Error(response.message || 'Ошибка при отправке заявления')
    }
    return response.data
})

export const downloadDocumentFx = createEffect<void, void>(async () => {
    await cardRequestApi.downloadDocument()
})

// Stores
export const $cardRequest = createStore<CardRequestData | null>(null)
    .on(getCardRequestFx.doneData, (_, data) => data)
    .on(submitCardRequestFx.doneData, (_, data) => data)
    .reset(cardRequestReset)

export const $isLoading = createStore(false)
    .on([getCardRequestFx, submitCardRequestFx, downloadDocumentFx], () => true)
    .on([getCardRequestFx.done, getCardRequestFx.fail, submitCardRequestFx.done, submitCardRequestFx.fail, downloadDocumentFx.done, downloadDocumentFx.fail], () => false)

export const $error = createStore<string | null>(null)
    .on([getCardRequestFx.fail, submitCardRequestFx.fail, downloadDocumentFx.fail], (_, error) => error.error.message || 'Произошла ошибка')
    .on([getCardRequestFx, submitCardRequestFx, downloadDocumentFx], () => null)

// Samples
sample({
    clock: cardRequestSubmitted,
    target: submitCardRequestFx,
})

sample({
    clock: documentDownloadRequested,
    target: downloadDocumentFx,
})

// Hooks for React components
export const useCardRequest = () => {
    return useUnit({
        cardRequest: $cardRequest,
        isLoading: $isLoading,
        error: $error,
        submitRequest: cardRequestSubmitted,
        downloadDocument: documentDownloadRequested,
        getRequest: getCardRequestFx,
        resetRequest: cardRequestReset,
    })
}

// Model export
export const cardRequestModel = {
    events: {
        cardRequestSubmitted,
        documentDownloadRequested,
        cardRequestReset,
    },
    effects: {
        getCardRequestFx,
        submitCardRequestFx,
        downloadDocumentFx,
    },
    stores: {
        $cardRequest,
        $isLoading,
        $error,
    },
    selectors: {
        useCardRequest,
    },
}
