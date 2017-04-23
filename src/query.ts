import Options from './options'
import Where from './where'
import { TableCols } from './types'

export default class Query<T> {
    protected options = new Options()
    protected whereClause: Where = null

    where(values: TableCols<T>) {
        this.whereClause = new Where(values)
        return this
    }

    groupBy(...columns: string[]) {
        this.options.orderBy.cols = columns
        return this
    }

    orderBy(...columns: string[]) {
        this.options.orderBy.cols = columns
        return this
    }

    limit(limit: number) {
        this.options.limit.value = limit
        return this
    }

    offset(offset: number) {
        this.options.offset.value = offset
        return this
    }
}
