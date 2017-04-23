import {
    escape
} from 'mysql'
import {
    parseColumns,
    dateTimeFormat
} from '../helpers'

import Or from './or'

export default class Where {
    protected wh = []

    constructor(protected values) {
        for (let a in values) {
            let tp = typeof values[a]
            let col = parseColumns(a)
            if (tp == 'string') {
                this.wh.push(`${col} = ${escape(values[a])}`)
            } else if (tp == 'number') {
                this.wh.push(`${col} = ${values[a]}`)
            } else if (values[a] === null) {
                this.wh.push(`${col} IS NULL`)
            } else if (tp == 'object') {
                let or = new Or(a, values[a])
                this.wh.push(or.toString())
            } else if (tp == 'function') {
                this.wh.push(values[a](a))
            }
        }
    }

    toString() {
        var wh = this.wh.filter(e => e != '')

        if (wh.length > 0)
            return `WHERE (\n\t${wh.join(' AND\n\t')}\n)`

        return ''
    }
}
