import * as querystring from 'querystring';
import {
    createConnection,
    IConnectionConfig,
    IConnection,
    escape
} from 'mysql'
import {
    sprintf
} from 'sprintf'

import View from './view'
import Table from './table'

import Select from './select'
import Count from './count'
import Insert from './insert'
import Update from './update'
import Delete from './delete'

const connections: IConnection[] = []

export function closeConnections() {
    connections.forEach(connection => {
        connection.end()
    })
}

export default class DB {
    protected connection: IConnection

    constructor(config: IConnectionConfig) {
        this.connection = createConnection(config)
        connections.push(this.connection)
    }

    createView<TableConf>(name: string): View<TableConf> {
        return new View(
            this.connection,
            name
        )
    }

    createTable<TableConf>(name: string): Table<TableConf> {
        return new Table(
            this.connection,
            name
        )
    }

    async query(queryString: string, ...params: (string | number)[]) {
        var escapedParams = params.map((v) => escape(v))
        var query = sprintf(queryString, ...escapedParams)

        return new Promise<any[]>((resolve, reject) => {
            this.connection.query(query, (error, results) => {
                if (error) reject({ error, query })
                else resolve(results)
            })
        })
    }

    select(table: string) {
        return new Select<any>(this.connection, table)
    }

    count(table: string) {
        return new Count<any>(this.connection, table)
    }

    insert(table: string) {
        return new Insert<any>(this.connection, table)
    }

    update(table: string) {
        return new Update<any>(this.connection, table)
    }

    delete(table: string) {
        return new Delete<any>(this.connection, table)
    }

    close() {
        this.connection.end()
    }
}
