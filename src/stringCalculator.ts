export class StringCalculator {
    private static readonly DEFAULT_DELIMITERS = [',', '\n'];

    add(input: string): number | void {
        if (!input) {
            return 0
        }

        const delimiters = [...StringCalculator.DEFAULT_DELIMITERS];
        const customDelimiterMatch = input.match(/^\/\/(.+)\n(.*)$/);
        if (customDelimiterMatch) {
            const delimiterSection = customDelimiterMatch[1];
            const numbersPart = customDelimiterMatch[2];
            delimiters.push(delimiterSection);
            input = numbersPart; 
        }
        const pattern = new RegExp(delimiters.map(d => this.escapeRegExp(d)).join('|'));

        const parts = input.split(pattern).filter(x => x !== '');
        const nums = parts.map(n => parseInt(n, 10));
        return nums.reduce((sum, val) => sum + val, 0);
    }

    private escapeRegExp(s: string): string {
        return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}
