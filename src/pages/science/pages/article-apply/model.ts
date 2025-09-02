import { isAxiosError } from 'axios'
import { attach, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'
import { and, pending } from 'patronum'

import { articleModel } from '@entities/science'

import { Subdivision, scienceApi, subdivisionsApi } from '@shared/api/science'
import { createCheckboxField } from '@shared/effector/form/create-checkbox-field'
import { createInputField } from '@shared/effector/form/create-input-field'
import { createSelectField } from '@shared/effector/form/create-select-field'
import { popUpMessageModel } from '@shared/ui/pop-up-message'

export const ArticleApplyGate = createGate<{ articleId: string }>()

export const sendForm = createEvent()

export const $departments = createStore<Subdivision[] | null>(null)
const $articleId = createStore<string | null>(null).on(ArticleApplyGate.open, (_, { articleId }) => articleId)
export const title = createInputField()
export const department = createSelectField({ reset: [ArticleApplyGate.open, ArticleApplyGate.close] })

export const completed = createCheckboxField({ reset: [ArticleApplyGate.open, ArticleApplyGate.close] })
export const $isActive = and(title.value)

const applyArticleFx = attach({ effect: scienceApi.applyArticleFx })
const getUserSubdivisionsFx = attach({ effect: subdivisionsApi.getUserSubdivisionsFx })
export const $formPending = pending([applyArticleFx])

sample({
    clock: ArticleApplyGate.open,
    source: articleModel.stores.article,
    filter: Boolean,
    fn: ({ articleTitle }) => articleTitle,
    target: title.value,
})

sample({
    clock: ArticleApplyGate.open,
    source: $departments,
    filter: (data) => !data,
    fn: () => ({
        guid: null,
        name: null,
        isDepartment: true,
        isFaculty: null,
        headGuid: null,
        parentGuid: null,
        includeDisabled: null,
        includeChildSubdivisions: null,
    }),
    target: getUserSubdivisionsFx,
})

sample({
    clock: getUserSubdivisionsFx.doneData,
    fn: (data) => data.filter((subdivision) => subdivision.isDepartment),
    target: $departments,
})

sample({
    clock: sendForm,
    source: {
        articleId: $articleId,
        department: department.value,
    },
    fn: ({ articleId, department }) => ({ articleId: articleId!, departmentId: department?.id.toString() ?? null }),
    target: applyArticleFx,
})

sample({
    clock: applyArticleFx.done,
    target: completed.setValue.prepend(() => true),
})

sample({
    clock: applyArticleFx.failData,
    fn: (error) => {
        if (isAxiosError(error) && error.response?.data.type === 'AlreadyApplied')
            return {
                message: 'Вы уже подали заявку на эту статью',
                type: 'failure' as const,
            }
        return {
            message: 'При отправке заявки произошла ошибка. Попробуйте позднее',
            type: 'failure' as const,
        }
    },
    target: popUpMessageModel.events.evokePopUpMessage,
})
