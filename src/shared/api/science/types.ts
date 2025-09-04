export type Changes = Record<
    string,
    Record<
        string,
        {
            old: object | null
            new: object | null
        }
    >
>
export type Article = {
    id: string
    doi: string
    authors: string
    articleTitle: string
    isWoS: boolean
    isScopus: boolean
    publisher: string
    pageNumber: string
    publicationType: string
    fundingSource: string
    publicationYear: string
    quotesCount: string
}
export type Sort = {
    field: string
    order: 'ASC' | 'DESC'
}

export type Filter = {
    field: string
    value: string | boolean | number
    operation: 'Eq' | 'Like'
}

export type Subdivision = {
    guid: string
    name: string
    headGuid: string | null
    parentGuid: string | null
    isActive: boolean
    isDepartment: boolean
    isFaculty: boolean
    childSubdivisions: Subdivision[]
}

export const ArticleApplicationStatuses = {
    Accepted: 'Принято',
    Declined: 'Отклонено',
    HeadOfDepartmentReview: 'На рассмотрении заведующим кафедрой',
    DeanOrDeputyDeanReview: 'На рассмотрении деканом или заместителем декана',
    AdminReview: 'На рассмотрении администратором',
}

export type ArticleApplicationStatus = keyof typeof ArticleApplicationStatuses
export type ArticleApplicationStatusName = (typeof ArticleApplicationStatuses)[ArticleApplicationStatus]

export type ArticleApplication = {
    id: string
    authorId: string
    articleId: string
    departmentId: string
    status: ArticleApplicationStatus
    createdAt: string
    article: {
        title: string
    }
}

type AcceptanceStatus = {
    userId: string
    isApproved: true
    updatedAt: string
} | null

export type ArticleApplicationDetailed = {
    acceptanceChain: {
        headOfDepartment: AcceptanceStatus
        deanOrDeputyDean: AcceptanceStatus
        admin: AcceptanceStatus
    }
    declineReason: null
    authorsFractionShares:
        | [
              {
                  authorName: string
                  fractionShare: 1
                  isApplyingAuthor: true
              },
          ]
        | null
    id: string
    authorId: string
    articleId: string
    departmentId: null
    article: {
        title: string
    }
    author: {
        fullName: string
    }
    status: ArticleApplicationStatus
    createdAt: string
}
