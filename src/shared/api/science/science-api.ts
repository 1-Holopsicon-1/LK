import { createQuery } from '@farfetched/core'
import { createEffect } from 'effector'

import {
    Article,
    ArticleApplication,
    ArticleApplicationDetailed,
    ArticleApplicationStatus,
    Changes,
    Filter,
    Sort,
} from '@shared/api/science/types'

import { $rolesApi, $scienceApi, $subdivisionApi } from '../config/science-config'

type ServiceRoles = {
    Roles: {
        Name: string
    }[]
}

export const getRolesQuery = createQuery({
    handler: async () => {
        const { data } = await $rolesApi.get<{
            Data: {
                Id: string
                Apps: {
                    Lk: ServiceRoles
                    Science: ServiceRoles
                }
            }
        }>(`/me`)
        return data
    },
})

export type UploadReq = { scopusFile: File; wosFile: File }

export const uploadArticle = async ({ scopusFile, wosFile }: UploadReq) => {
    const formData = new FormData()
    formData.append('scopusFile', scopusFile)
    formData.append('wosFile', wosFile)

    const { data } = await $scienceApi.post<Changes>('/data', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return data
}

export const getAllArticles = async (params: {
    limit: number
    offset: number
    sorts: Sort[] | null
    filters: Filter[] | null
}) => {
    const { data } = await $scienceApi.post<{ data: Article[]; totalCount: number }>(`/article/all`, params)
    return data
}

export const getArticle = async (id: string) => {
    const { data } = await $scienceApi.get<{ data: Article }>(`/article/${id}`)

    return data.data
}

export const getArticleDetails = async (id: string) => {
    const {
        data: { data, titles },
    } = await $scienceApi.get(`/article/${id}/details`)
    const scopusData = data?.scopus && convertKeysToLowerCase(data.scopus)
    const wosData = data?.wos && convertKeysToLowerCase(data.wos)

    return {
        titles: {
            scopus: convertKeysToLowerCase(titles.scopus),
            wos: convertKeysToLowerCase(titles.wos),
        },
        data: {
            scopus: scopusData,
            wos: wosData,
        },
    }
}
function convertKeysToLowerCase(obj: Record<string, any>): Record<string, any> {
    return Object.keys(obj).reduce(
        (acc, key) => {
            acc[key.toLowerCase()] = obj[key]
            return acc
        },
        {} as Record<string, any>,
    )
}

export type ApplyArticleFxParams = {
    articleId: string
    departmentId: string | null
}
export const applyArticleFx = createEffect(async (params: ApplyArticleFxParams) => {
    const { data } = await $scienceApi.post('/article/application', params)
    return data
})

export type GetUserArticleApplicationsFxParams = { limit: number; offset: number; statuses: ArticleApplicationStatus[] }
export const getUserArticleApplicationsFx = createEffect(async (params: GetUserArticleApplicationsFxParams) => {
    const { data } = await $scienceApi.post<{
        totalCount: number
        data: ArticleApplication[]
    }>('/article/application/all', params)
    return data.data
})

export type GetAllArticleApplicationsFxParams = { limit: number; offset: number; statuses: ArticleApplicationStatus[] }
export const getAllArticleApplicationsFx = createEffect(async (params: GetAllArticleApplicationsFxParams) => {
    const { data } = await $scienceApi.post<{
        data: ArticleApplication[]
        totalCount: number
    }>('/article/application/approver/all', params)
    return data
})

export type GetArticleApplicationByIdFxParams = { applicationId: string }
export const getArticleApplicationByIdFx = createEffect(async (params: GetArticleApplicationByIdFxParams) => {
    const { data } = await $scienceApi.get<{
        data: ArticleApplicationDetailed
    }>('/article/application/' + params.applicationId)
    return data.data
})

export type GetArticleApplicationByIdAdminFxParams = { applicationId: string }
export const getArticleApplicationByIdAdminFx = createEffect(async (params: GetArticleApplicationByIdFxParams) => {
    const { data } = await $scienceApi.get<{
        data: ArticleApplicationDetailed
    }>('/article/application/approver/' + params.applicationId)
    return data.data
})

export type ApproveApplicationFxParams = { id: string; fractionShare: number | null }
export const approveApplicationFx = createEffect(async ({ id, fractionShare }: ApproveApplicationFxParams) => {
    const { data } = await $scienceApi.post(`/article/application/${id}/approve`, { fractionShare })
    return data
})

export type DeclineApplicationFxParams = { id: string; declineReason: string }
export const declineApplicationFx = createEffect(async ({ id, declineReason }: DeclineApplicationFxParams) => {
    const { data } = await $scienceApi.post(`/article/application/${id}/decline`, { declineReason })
    return data
})

export type PublicationsStatisticsParams = {
    subdivisionIds?: string[]
    yearFrom?: number
    yearTo?: number
    publicationTypes?: string[]
    isWoS?: boolean
    isScopus?: boolean
}

export const getPublicationsStatistics = async (params: PublicationsStatisticsParams) => {
    // Временные мок-данные для тестирования
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Имитация задержки сети

    const mockData = {
        data: [
            {
                subdivisionId: '1',
                subdivisionName: 'Факультет информационных технологий',
                totalPublications: 45,
                wosPublications: 28,
                scopusPublications: 35,
                citationsCount: 284,
                publicationsByYear: [
                    { year: 2024, count: 12 },
                    { year: 2023, count: 18 },
                    { year: 2022, count: 15 },
                ],
                publicationsByType: [
                    { type: 'Статья в журнале', count: 35 },
                    { type: 'Тезисы конференции', count: 8 },
                    { type: 'Обзор', count: 2 },
                ],
                topAuthors: [
                    { authorName: 'Иванов И.И.', publicationsCount: 8 },
                    { authorName: 'Петров П.П.', publicationsCount: 6 },
                    { authorName: 'Сидоров С.С.', publicationsCount: 5 },
                ],
            },
            {
                subdivisionId: '2',
                subdivisionName: 'Факультет машиностроения',
                totalPublications: 32,
                wosPublications: 18,
                scopusPublications: 25,
                citationsCount: 156,
                publicationsByYear: [
                    { year: 2024, count: 8 },
                    { year: 2023, count: 14 },
                    { year: 2022, count: 10 },
                ],
                publicationsByType: [
                    { type: 'Статья в журнале', count: 25 },
                    { type: 'Тезисы конференции', count: 5 },
                    { type: 'Книга', count: 2 },
                ],
                topAuthors: [
                    { authorName: 'Козлов К.К.', publicationsCount: 7 },
                    { authorName: 'Волков В.В.', publicationsCount: 4 },
                    { authorName: 'Орлов О.О.', publicationsCount: 3 },
                ],
            },
        ],
        summary: {
            totalPublications: 77,
            totalCitations: 440,
            avgCitationsPerPublication: 5.71,
        },
    }

    return mockData
}

export type FractionShareStatsParams = {
    startYear: number
    endYear: number
    name?: string
    limit: number
    offset: number
    facultyId?: string
    departmentId?: string
}

export type FractionShareStats = {
    id: string
    name: string
    fractionShare: number
}

export type PublicationStatisticsParams = {
    startYear: number
    endYear: number
    limit: number
    offset: number
    facultyId?: string
    departmentId?: string
}

export type PublicationStatistics = {
    id: string
    name: string
    publicationCount: number
    activeAuthorsCount: number
}

export type Subdivision = {
    guid: string
    name: string
    headGuid?: string
    parentGuid?: string
    isActive: boolean
    isDepartment: boolean
    isFaculty: boolean
    childSubdivisions?: Subdivision[]
}

export type SubdivisionFilters = {
    guids?: string[]
    name?: string
    isDepartment?: boolean
    isFaculty?: boolean
    headGuids?: string[]
    parentGuids?: string[]
    limit?: number
    offset?: number
}

export const getFacultyStats = async (params: FractionShareStatsParams) => {
    try {
        const response = await $scienceApi.get('/fraction-share/stats/faculty', {
            params: {
                StartYear: params.startYear,
                EndYear: params.endYear,
                Name: params.name,
                Limit: params.limit,
                Offset: params.offset,
            },
        })
        
        const actualData = response.data?.data || response.data
        return Array.isArray(actualData) ? actualData : []
    } catch (error) {
        console.error('Error fetching faculty stats:', error)
        return []
    }
}

export const getDepartmentStats = async (params: FractionShareStatsParams) => {
    try {
        const response = await $scienceApi.get('/fraction-share/stats/department', {
            params: {
                FacultyId: params.facultyId,
                StartYear: params.startYear,
                EndYear: params.endYear,
                Name: params.name,
                Limit: params.limit,
                Offset: params.offset,
            },
        })
        
        const actualData = response.data?.data || response.data
        return Array.isArray(actualData) ? actualData : []
    } catch (error) {
        console.error('Error fetching department stats:', error)
        return []
    }
}

export const getAuthorStats = async (params: FractionShareStatsParams) => {
    try {
        const response = await $scienceApi.get('/fraction-share/stats/author', {
            params: {
                FacultyId: params.facultyId,
                DepartmentId: params.departmentId,
                StartYear: params.startYear,
                EndYear: params.endYear,
                Name: params.name,
                Limit: params.limit,
                Offset: params.offset,
            },
        })
        
        const actualData = response.data?.data || response.data
        return Array.isArray(actualData) ? actualData : []
    } catch (error) {
        console.error('Error fetching author stats:', error)
        return []
    }
}

export const getPublicationStatistics = async (params: PublicationStatisticsParams) => {
    try {
        const response = await $scienceApi.get('/publications/stats', {
            params: {
                StartYear: params.startYear,
                EndYear: params.endYear,
                Limit: params.limit,
                Offset: params.offset,
                FacultyId: params.facultyId,
                DepartmentId: params.departmentId,
            },
        })
        
        const actualData = response.data?.data || response.data
        return Array.isArray(actualData) ? actualData : []
    } catch (error) {
        console.error('Error fetching publication statistics:', error)
        return []
    }
}

export const getAllSubdivisions = async (filters: SubdivisionFilters = {}) => {
    try {
        const response = await $subdivisionApi.post('/all', filters)
        const actualData = response.data?.data || response.data
        return Array.isArray(actualData) ? actualData : []
    } catch (error) {
        console.error('Error fetching subdivisions:', error)
        return []
    }
}

export const getFaculties = async (name?: string) => {
    const filters: SubdivisionFilters = {
        isFaculty: true,
        limit: 100,
        offset: 0
    }
    if (name) {
        filters.name = name
    }
    try {
        const result = await getAllSubdivisions(filters)
        return Array.isArray(result) ? result : []
    } catch (error) {
        console.error('Error fetching faculties:', error)
        return []
    }
}

export const getDepartments = async (name?: string, facultyId?: string) => {
    const filters: SubdivisionFilters = {
        isDepartment: true,
        limit: 100,
        offset: 0
    }
    if (name) {
        filters.name = name
    }
    if (facultyId) {
        filters.parentGuids = [facultyId]
    }
    try {
        const result = await getAllSubdivisions(filters)
        return Array.isArray(result) ? result : []
    } catch (error) {
        console.error('Error fetching departments:', error)
        return []
    }
}
