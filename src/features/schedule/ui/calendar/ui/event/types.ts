import { DayCalendarEvent } from '@shared/api/model'

export type UIProps = {
    shift: number
    scale: number
    onClick: (event: DayCalendarEvent) => void
    shortInfo?: boolean
    leftShift: number
    quantity: number
    listView?: boolean
    nameInOneRow?: boolean
}

export type StyledProps = Omit<UIProps, 'onClick' | 'shift'> & {
    duration: number
    textColor: string
    top: number
    background: string
}
