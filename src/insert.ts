import {
    IConnection,
    escape
} from 'mysql'
import Options from './options'
import {
    dateTimeFormat,
    parseColumns,
} from './helpers'
import { insertPromise } from './promises'

export default class Insert<Table> {
    protected cols: string[] = []
    protected vals: string[] = []

    constructor(
        protected connection: IConnection,
        protected table: string
    ) {
        this.table = parseColumns(table)
    }

    values(values: Partial<Table>): Insert<Table> {
        this.cols = []
        this.vals = []

        for (var a in values) {
            let type = typeof values[a]

            this.cols.push(parseColumns(a))

            if (type === 'string') {
                let esc = escape(`${values[a]}`)
                this.vals.push(`${esc}`)
            } else if (type === 'number') {
                this.vals.push(`${values[a]}`)
            } else if (values[a] == null) {
                this.vals.push(`NULL`)
            } else if (values[a] instanceof Date) {
                let dateTime = dateTimeFormat(<any>values[a])
                this.vals.push(`'${dateTime}'`)
            }
        }

        return this
    }

    get queryString(): string {
        var lines = [
            `INSERT INTO ${this.table}`,
            `(${this.cols.join(', ')})`,
            `VALUES (\n\t${this.vals.join(',\n\t')}\n)`
        ]

        return lines.join('\n')
    }

    toString(): string {
        return this.queryString
    }

    async exec() {
        return insertPromise(
            this.connection,
            this.queryString
        )
    }
}
