import { IConnection } from 'mysql'
import Options from './options'
import Query from './query'
import { deletePromise } from './promises'
import { parseColumns } from './helpers'

export default class Delete<Table> extends Query<Table> {
    constructor(
        protected connection: IConnection,
        protected table: string
    ) {
        super()

        this.table = parseColumns(table)
    }

    get queryString(): string {
        var lines = [
            `DELETE FROM ${this.table}`,
            `${this.whereClause || ''}`,
            `${this.options}`
        ]

        return lines.join('\n')
    }

    toString(): string {
        return this.queryString
    }

    get exec() {
        return deletePromise(
            this.connection,
            this.queryString
        )
    }
}
