import { attach, createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'
import { pending, reset } from 'patronum'

import { ArticleApplication, ArticleApplicationDetailed, scienceApi } from '@shared/api/science'
import { popUpMessageModel } from '@shared/ui/pop-up-message'

export const ArticleApplicationsAdminGate = createGate()
export const ApplicationGate = createGate<scienceApi.GetArticleApplicationByIdFxParams>()

export const approve = createEvent<scienceApi.ApproveApplicationFxParams>()
export const decline = createEvent<scienceApi.DeclineApplicationFxParams>()
export const applicationOpened = createEvent()
export const applicationDataFetched = createEvent<scienceApi.GetArticleApplicationByIdFxParams>()

export const $articleApplications = createStore<ArticleApplication[]>([])
export const $articleApplication = createStore<ArticleApplicationDetailed | null>(null)
export const $applicationsLoading = createStore<Map<string, 'approving' | 'declining'>>(new Map())

const getAllArticleApplicationsFx = attach({ effect: scienceApi.getAllArticleApplicationsFx })
const getUserArticleApplicationsFx = attach({ effect: scienceApi.getUserArticleApplicationsFx })
const getArticleApplicationByIdFx = attach({ effect: scienceApi.getArticleApplicationByIdFx })
const getArticleApplicationByIdAdminFx = attach({ effect: scienceApi.getArticleApplicationByIdAdminFx })
const approveApplicationFx = attach({ effect: scienceApi.approveApplicationFx })
const declineApplicationFx = attach({ effect: scienceApi.declineApplicationFx })

const getArticleApplicationFx = createEffect(
    async ({ params, isAdmin }: { params: scienceApi.GetArticleApplicationByIdFxParams; isAdmin: boolean }) => {
        if (isAdmin) getArticleApplicationByIdAdminFx(params)
        else getArticleApplicationByIdFx(params)
    },
)

sample({
    clock: applicationDataFetched,
    source: scienceApi.getRolesQuery.$data,
    fn: (roles, params) => ({
        params,
        isAdmin: Boolean(roles?.Data.Apps.Science.Roles.some((role) => role.Name === 'Admin')),
    }),
    target: getArticleApplicationFx,
})

export const pageLoading = pending([getAllArticleApplicationsFx])

sample({
    clock: ArticleApplicationsAdminGate.open,
    source: scienceApi.getRolesQuery.$data,
    filter: (roles) => !Boolean(roles?.Data.Apps.Science.Roles.some((role) => role.Name === 'Admin')),
    fn: (): scienceApi.GetAllArticleApplicationsFxParams => ({
        limit: 100,
        offset: 0,
        statuses: ['AdminReview', 'DeanOrDeputyDeanReview', 'HeadOfDepartmentReview'],
    }),
    target: [getUserArticleApplicationsFx],
})

sample({
    clock: ArticleApplicationsAdminGate.open,
    source: scienceApi.getRolesQuery.$data,
    filter: (roles) => Boolean(roles?.Data.Apps.Science.Roles.some((role) => role.Name === 'Admin')),
    fn: (): scienceApi.GetAllArticleApplicationsFxParams => ({
        limit: 100,
        offset: 0,
        statuses: ['AdminReview', 'DeanOrDeputyDeanReview', 'HeadOfDepartmentReview'],
    }),
    target: [getAllArticleApplicationsFx],
})

sample({
    clock: ApplicationGate.open,
    target: applicationDataFetched,
})

reset({
    clock: applicationOpened,
    target: $articleApplication,
})

$articleApplications.on(getAllArticleApplicationsFx.doneData, (_, { data }) => data)
$articleApplication.on(
    [getArticleApplicationByIdFx.doneData, getArticleApplicationByIdAdminFx.doneData],
    (_, data) => data,
)

sample({
    clock: approve,
    target: approveApplicationFx,
})

sample({
    clock: decline,
    target: declineApplicationFx,
})

$applicationsLoading.on(approve, (applications, { id }) => new Map(applications).set(id, 'approving'))
$applicationsLoading.on(decline, (applications, { id }) => new Map(applications).set(id, 'declining'))

sample({
    clock: approveApplicationFx.done,
    target: popUpMessageModel.events.evokePopUpMessage.prepend(() => ({
        message: 'Заявка одобрена',
        type: 'success',
    })),
})

sample({
    clock: declineApplicationFx.done,
    target: popUpMessageModel.events.evokePopUpMessage.prepend(() => ({
        message: 'Заявка отклонена',
        type: 'success',
    })),
})

sample({
    clock: [approveApplicationFx.fail, declineApplicationFx.fail],
    target: popUpMessageModel.events.evokePopUpMessage.prepend(() => ({
        message: 'Что-то пошло не так',
        type: 'failure',
    })),
})

$applicationsLoading.on(
    [approveApplicationFx.finally, declineApplicationFx.finally],
    (applications, { params: { id } }) => {
        const mapCopy = new Map(applications)
        mapCopy.delete(id)
        return mapCopy
    },
)

sample({
    clock: [approveApplicationFx.done, declineApplicationFx.done],
    fn: (): scienceApi.GetAllArticleApplicationsFxParams => ({
        limit: 100,
        offset: 0,
        statuses: ['AdminReview', 'DeanOrDeputyDeanReview', 'HeadOfDepartmentReview'],
    }),
    target: getAllArticleApplicationsFx,
})

sample({
    clock: [approveApplicationFx.done, declineApplicationFx.done],
    source: $articleApplication,
    filter: Boolean,
    fn: (article) => ({
        applicationId: article.id,
    }),
    target: applicationDataFetched,
})
