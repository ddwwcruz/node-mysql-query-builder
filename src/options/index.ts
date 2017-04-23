import GroupBy from './group-by'
import OrderBy from './order-by'
import Limit from './limit'
import Offset from './offset'

export default class Options {
    groupBy = new GroupBy()
    orderBy = new OrderBy()
    limit = new Limit()
    offset = new Offset()

    toString(): string {
        var ret = [
            `${this.groupBy}`,
            `${this.orderBy}`,
            `${this.limit}`,
            `${this.offset}`
        ]

        return ret.filter(e => {
            return (e.length > 0)
        }).join(' ')
    }
}
