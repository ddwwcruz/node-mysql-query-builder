import { IConnection } from 'mysql'
import Select from './select'
import Count from './count'

export default class View<Table> {
    constructor(
        protected connection: IConnection,
        protected name: string
    ) { }

    get select(): Select<Table> {
        return new Select(
            this.connection,
            this.name
        )
    }

    get count(): Count<Table> {
        return new Count(
            this.connection,
            this.name
        )
    }
}
