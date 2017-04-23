import { IConnection } from 'mysql'
import Options from './options'
import Query from './query'
import { countPromise } from './promises'
import { parseColumns } from './helpers'

export default class Count<T> extends Query<T> {
    constructor(
        protected connection: IConnection,
        protected table: string
    ) {
        super()
        this.table = parseColumns(table)
    }

    get queryString(): string {
        var lines = [
            `SELECT COUNT(*) FROM ${this.table}`,
            `${this.whereClause || ''}`
        ]

        return lines.join('\n')
    }

    toString(): string {
        return this.queryString
    }

    async get() {
        return countPromise(
            this.connection,
            this.queryString
        )
    }
}
