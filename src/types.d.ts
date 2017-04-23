export type Filter = (col: string) => string

export type TableCols<T> = {
    [P in keyof T]?: T[P] | T[P][] | Filter
}
