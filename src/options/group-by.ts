import {
    parseColumns
} from '../helpers'

export default class GroupBy {
    cols: string[] = []

    toString(): string {
        if (this.cols.length > 0) {
            return `GROUP BY ${parseColumns(...this.cols)}`
        }

        return ''
    }
}
