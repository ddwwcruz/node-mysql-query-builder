import * as querystring from 'querystring';
import { IConnection } from 'mysql'
import Options from './options'
import Query from './query'
import { selectPromise } from './promises'
import { parseColumns } from './helpers'

export default class Select<T> extends Query<T> {
    protected cols = ''

    constructor(protected con: IConnection, protected table: string) {
        super()
    }

    columns(...cols: string[]) {
        this.cols = parseColumns(...cols)
        return this
    }

    get querystring() {
        var lines = [
            `SELECT ${this.cols}`,
            `FROM ${parseColumns(this.table)}`,
            `${this.whereClause || ''}`,
            `${this.options}`
        ]

        return lines.join('\n')
    }

    toString() {
        return this.querystring
    }

    async get() {
        return selectPromise<T>(this.con, this.querystring)
    }
}
