export class StringCalculator {
    private static readonly DEFAULT_DELIMITERS = [',', '\n'];
    private static readonly CUSTOM_DELIMITER_PATTERN = /^\/\/(.*?)\n(.*)$/;
    private static readonly MULTI_DELIMITER_PATTERN = /\[(.*?)\]/g;
    private static readonly MAX_NUMBER = 1000;

    public add(input: string): number {
        if (!input) return 0;

        const { delimiters, numbersString } = this.parseInput(input);
        if (!numbersString) return 0;

        const tokens = this.splitNumbers(numbersString, delimiters);
        const validNumbers = this.validateNumbers(tokens);
        return this.sumNumbers(validNumbers);
    }

    private parseInput(input: string): { delimiters: string[], numbersString: string } {
        const customMatch = input.match(StringCalculator.CUSTOM_DELIMITER_PATTERN);
        let delimiters = [...StringCalculator.DEFAULT_DELIMITERS];
        let numbersString = input;

        if (customMatch) {
            const delimiterSection = customMatch[1];
            numbersString = customMatch[2];
            const customDelimiters = this.extractDelimiters(delimiterSection);
            delimiters = delimiters.concat(customDelimiters);
        }

        return { delimiters, numbersString };
    }

    private extractDelimiters(delimiterSection: string): string[] {
        const multiMatches = delimiterSection.matchAll(StringCalculator.MULTI_DELIMITER_PATTERN);
        const delimiters = [...multiMatches].map(m => m[1]);
        
        if (delimiters.length === 0) {
            if (!delimiterSection) {
                throw new Error('Invalid delimiter definition: no delimiters found.');
            }
            delimiters.push(delimiterSection);
        } else {
            // Check for empty delimiter
            if (delimiters.some(d => d === '')) {
                throw new Error('Invalid delimiter definition: empty delimiter found.');
            }
        }

        return delimiters;
    }

    private splitNumbers(numbersString: string, delimiters: string[]): string[] {
        const pattern = new RegExp(delimiters.map(d => this.escapeRegExp(d)).join('|'));
        return numbersString.split(pattern).filter(x => x.trim() !== '');
    }

    private validateNumbers(tokens: string[]): number[] {
        const nums: number[] = [];
        const negatives: number[] = [];

        for (const t of tokens) {
            if (!/^-?\d+$/.test(t)) {
                throw new Error(`Invalid input: "${t}" is not a number.`);
            }

            const num = parseInt(t, 10);
            if (num < 0) {
                negatives.push(num);
            } else if (num <= StringCalculator.MAX_NUMBER) {
                nums.push(num);
            }
        }

        if (negatives.length > 0) {
            throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
        }

        return nums;
    }

    private sumNumbers(values: number[]): number {
        return values.reduce((sum, val) => sum + val, 0);
    }

    private escapeRegExp(s: string): string {
        return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}
