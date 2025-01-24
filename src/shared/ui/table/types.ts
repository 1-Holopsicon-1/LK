import { Align } from '@ui/types'
import { IndexedProperties } from '@utility-types/indexed-properties'

import { SelectPage } from '@features/select'

export type SortType = 'desc' | 'asc' | null

export type TableSearchType = { value: string; column: Nullable<ColumnProps> } | null
export type TableCatalogType = { [field: string]: { value: SelectPage; column: Nullable<ColumnProps> } } | null
export type TableSortType = { value: SortType; column: Nullable<ColumnProps> } | null

export type ColumnType = 'date' | 'rub' | 'file'

export interface ColumnProps {
    title: string
    field: string
    priority?: 'one' | 'two' | 'three' | 'four' | 'five' | 'six'
    showFull?: boolean
    width?: string
    align?: Align
    search?: boolean
    sort?: boolean
    catalogs?: SelectPage[]
    type?: ColumnType
    render?: (value: any, obj: IndexedProperties) => ChildrenType
    onClick?: (obj: IndexedProperties) => void
}

export type Footer = (props: { [key: string]: any[] } | null) => IndexedProperties

export interface TableProps {
    columns: ColumnProps[]
    columnsExtended?: ColumnProps[]
    footer?: Footer
    data: Nullable<IndexedProperties[]>
    selected?: Set<number>
    select?: (rowIndex: number) => void
    maxOnPage?: number
    onRowClick?: (obj: IndexedProperties) => void
    loading?: boolean
    pagination?: {
        pages: number
        setPage: (offset: number) => void
    }
    innerPadding?: string
}
