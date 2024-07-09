export interface businesstripNotification {
    id: string
    analit?: number
    startDate?: string
    endDate?: string
    tripType?: string
    сountry?: string
    city?: string
    organization?: string
    event?: string
    travelingTask?: string
    objective?: string
    basis?: string
    guidRab?: string
    employee?: string
    docId?: number
    status?: string
    file: string
    viewed: boolean
    post?: string
    notificationType: 'businesstrip'
}

export interface baseNotification {
    id: string
    type: string
    startDate?: string
    endDate?: string
    subdivision?: string
    post?: string
    jobType?: string
    file: string
    viewed: boolean
    event?: string
    notificationType?: 'fire' | 'vacation'
}

export interface docsNotification {
    id: string
    type: string
    date: string
    name: string
    number: string
    link: string
    viewed: boolean
    document: boolean
    notificationType: 'docs'
}

export interface AllowanceNotification {
    id: string
    initials: string
    sum: number
    startDate: string
    endDate: string
    divisionName: string
    status: 'approved' | 'rejected' | 'unknown'
}

export type ItemNotification = baseNotification | businesstripNotification | docsNotification

export type NameListNotification = 'businesstrip' | 'fire' | 'vacation' | 'docs'

export type Notifications = {
    [key in NameListNotification]?: ItemNotification[]
}

export interface viewNotificationResponse {
    result: string
}
