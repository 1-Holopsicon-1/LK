import { attach, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { ArticleApplication, scienceApi } from '@shared/api/science'

export const ArticleApplicationsGate = createGate()

export const $articleApplications = createStore<ArticleApplication[]>([])

const getUserArticleApplicationsFx = attach({ effect: scienceApi.getUserArticleApplicationsFx })

sample({
    clock: ArticleApplicationsGate.open,
    fn: (): scienceApi.GetUserArticleApplicationsFxParams => ({
        limit: 100,
        offset: 0,
        statuses: ['AdminReview', 'DeanOrDeputyDeanReview', 'HeadOfDepartmentReview', 'Accepted', 'Declined'],
    }),
    target: [getUserArticleApplicationsFx],
})

$articleApplications.on(getUserArticleApplicationsFx.doneData, (_, data) => data)
