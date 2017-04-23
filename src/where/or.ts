import {
    escape
} from 'mysql'
import {
    parseColumns,
    dateTimeFormat
} from '../helpers'

export default class Or {
    protected wh = []

    constructor(protected name, protected values) {
        name = parseColumns(name)

        for (let a in values) {
            let tp = typeof values[a]

            if (tp == 'string') {
                this.wh.push(`${name} = ${escape(values[a])}`)
            } else if (tp == 'number') {
                this.wh.push(`${name} = ${values[a]}`)
            } else if (values[a] === null) {
                this.wh.push(`${name} IS NULL`)
            } else if (tp == 'function') {
                this.wh.push(values[a](name))
            }
        }
    }

    toString(): string {
        if (this.wh.length == 0) {
            return ''
        }

        return `(${this.wh.join(' OR ')})`
    }
}
