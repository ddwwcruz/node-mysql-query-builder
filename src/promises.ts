import { connect } from 'tls';
import { IConnection } from 'mysql'

export function selectPromise<T>(con: IConnection, query: string) {
    return new Promise<T[]>((resolve, reject) => {
        con.query(query, (err, results) => {
            if (err) reject(err)
            else resolve(results)
        })
    })
}

export function insertPromise(con: IConnection, query: string) {
    return new Promise<number>((resolve, reject) => {
        con.query(query, (error, results) => {
            if (error) reject(error)
            else resolve(results.insertId)
        })
    })
}

export function countPromise(con: IConnection, query: string) {
    return new Promise<number>((resolve, reject) => {
        con.query(query, (error, results) => {
            if (error) reject(error)
            else resolve(results[0]['COUNT(*)'])
        })
    })
}

export function updatePromise(con: IConnection, query: string) {
    return new Promise<{
        affected: number,
        changed: number
    }>((resolve, reject) => {
        con.query(query, (error, results) => {
            if (error) reject(error)
            else resolve({
                affected: results.affectedRows,
                changed: results.changedRows
            })
        })
    })
}

export function deletePromise(con: IConnection, query: string) {
    return new Promise<number>((resolve, reject) => {
        con.query(query, (error, results) => {
            if (error) reject(error)
            else resolve(results.affectedRows)
        })
    })
}
