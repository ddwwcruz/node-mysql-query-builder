export default class Offset {
    value = 0

    toString(): string {
        if (this.value > 0) {
            return `OFFSET ${this.value}`
        }

        return ''
    }
}
