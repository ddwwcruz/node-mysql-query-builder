import {
    IConnection,
    escape
} from 'mysql'
import Options from './options'
import Query from './query'
import {
    dateTimeFormat,
    parseColumns
} from './helpers'
import {
    updatePromise
} from './promises'

export class SetValues {
    values: string[] = []

    constructor(values) {
        for (let a in values) {
            let type = typeof values[a]

            if (type == 'string') {
                this.addValue(a, `${escape(values[a])}`)
            } else if (type == 'number') {
                this.addValue(a, values[a])
            } else if (values[a] == null) {
                this.addValue(a, 'NULL')
            } else if (values[a] instanceof Date) {
                this.addValue(a, `'${dateTimeFormat(values[a])}'`)
            }
        }
    }

    addValue(col: string, value: string) {
        col = parseColumns(col)

        this.values.push(`${col} = ${value}`)
    }

    toString() {
        return `SET\n\t${this.values.join(',\n\t')}`
    }
}

export default class Update<Table> extends Query<Table> {
    protected setValues: SetValues = null

    constructor(
        protected connection: IConnection,
        protected table: string
    ) {
        super()

        this.table = parseColumns(table)
    }

    set(values: Table): Update<Table> {
        this.setValues = new SetValues(values)

        return this
    }

    async exec() {
        return updatePromise(
            this.connection,
            this.queryString
        )
    }

    get queryString(): string {
        let lines = [
            `UPDATE ${this.table}`,
            `${this.setValues || ''}`,
            `${this.whereClause || ''}`,
            `${this.options}`
        ]

        return lines.join('\n')
    }

    toString(): string {
        return this.queryString
    }
}
