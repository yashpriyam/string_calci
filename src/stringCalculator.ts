export class StringCalculator {
    add(input: string): number | void {
        if (!input) {
            return 0
        }
        return parseInt(input)
    }
}
