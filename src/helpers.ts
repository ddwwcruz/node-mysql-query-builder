import { sprintf } from 'sprintf'

/**
 * Formats a date so it can be inserted into a query string
 * @param date Date input
 */
export function dateTimeFormat(date: Date): string {
    var yy = date.getFullYear()
    var mm = date.getMonth()
    var dd = date.getDay()
    var h = date.getHours()
    var m = date.getMinutes()
    var s = date.getSeconds()

    return sprintf('%04d-%02d-%02d %02d:%02d:%02d', yy, mm, dd, h, m, s)
}

/**
 * Parses a list of columns
 * @param cols Columns
 */
export function parseColumns(...cols: string[]): string {
    if (cols.length > 0) {
        return cols.map(e => {
            return `\`${e}\``
        }).join(', ')
    }

    return '*'
}
