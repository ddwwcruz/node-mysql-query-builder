export default class Limit {
    value = 0

    toString(): string {
        if (this.value > 0) {
            return `LIMIT ${this.value}`
        }

        return ''
    }
}
