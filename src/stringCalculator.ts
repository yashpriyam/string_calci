export class StringCalculator {
    add(input: string): number {
        const inputNumber = parseInt(input)
        return isNaN(inputNumber) ? 0 : inputNumber
    }
}
