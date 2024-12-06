export class StringCalculator {
    add(input: string): number | void {
        if (!input) {
            return 0
        }

        input = input.replace(/\n/g, ',');
        const parts = input.split(',');
        const nums = parts.map(n => parseInt(n, 10));
        return nums.reduce((sum, val) => sum + val, 0);
        
    }
}
