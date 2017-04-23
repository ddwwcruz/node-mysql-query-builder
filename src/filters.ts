import { escape } from 'mysql'
import { Filter } from './types'
import { parseColumns } from './helpers'

export function is(value): Filter {
    if (typeof value == 'string') {
        return col => {
            return `${parseColumns(col)} IS ${escape(value)}`
        }
    } else if (typeof value == 'number') {
        return col => {
            return `${parseColumns(col)} IS ${value}`
        }
    }
}

export function like(pattern: string): Filter {
    return col => {
        pattern = escape(`%${pattern}%`)
        return `${parseColumns(col)} LIKE ${pattern}`
    }
}

export function not(value): Filter {
    if (typeof value == 'string') {
        return col => {
            return `${parseColumns(col)} != ${escape(value)}`
        }
    } else {
        return col => {
            return `${parseColumns(col)} != ${value}`
        }
    }
}
