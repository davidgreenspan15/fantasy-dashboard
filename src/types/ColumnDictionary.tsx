export type ColumnDictionary = Record<string, { value?: string; sort?: string }>

export interface Column {
  key: string
  label?: string
  columnFilter: boolean
  isImage?: boolean
  type: string
  canSort: boolean
  sticky?: string
  display: boolean
}
