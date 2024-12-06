export class StringCalculator {
    private static readonly DEFAULT_DELIMITERS = [',', '\n'];
    private static readonly CUSTOM_DELIMITER_PATTERN = /^\/\/(.+)\n(.*)$/;
    private static readonly MULTI_DELIMITER_PATTERN = /\[(.*?)\]/g;

    add(input: string): number | void {
        if (!input) {
            return 0
        }

        let delimiters = [...StringCalculator.DEFAULT_DELIMITERS];
        const customMatch = input.match(StringCalculator.CUSTOM_DELIMITER_PATTERN);
        if (customMatch) {
            const delimiterSection = customMatch[1];
            input = customMatch[2];

            const multiMatches = delimiterSection.matchAll(StringCalculator.MULTI_DELIMITER_PATTERN);
            const extracted = [...multiMatches].map(m => m[1]);
            if (extracted.length > 0) {
                delimiters = delimiters.concat(extracted);
            } else {
                delimiters.push(delimiterSection);
            }
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
