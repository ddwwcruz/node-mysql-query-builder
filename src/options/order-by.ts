import {
    parseColumns
} from '../helpers'

export default class OrderBy {
    cols: string[] = []

    toString(): string {
        if (this.cols.length > 0) {
            return `ORDER BY ${parseColumns(...this.cols)}`
        }

        return ''
    }
}
