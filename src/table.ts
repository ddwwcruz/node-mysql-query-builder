import Update from './update'
import Delete from './delete'
import Insert from './insert'

import View from './view'

export default class Table<Table> extends View<Table> {
    get update(): Update<Table> {
        return new Update(
            this.connection,
            this.name
        )
    }

    get insert(): Insert<Table> {
        return new Insert(
            this.connection,
            this.name
        )
    }

    get delete(): Delete<Table> {
        return new Delete(
            this.connection,
            this.name
        )
    }
}
