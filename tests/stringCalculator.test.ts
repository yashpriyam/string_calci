// tests/StringCalculator.test.ts
import { StringCalculator } from '../src/stringCalculator';

describe('StringCalculator', () => {
    let calculator: StringCalculator;

    beforeEach(() => {
        calculator = new StringCalculator();
    });

    it('1st: should return 0 if empty string is passed', () => {
        expect(calculator.add('')).toBe(0);
    });

    it('2nd: should return the number itself if only one number is provided', () => {
        expect(calculator.add('1')).toBe(1);
    });

    it('3rd: should return sum of two comma-separated numbers', () => {
        expect(calculator.add('1,2')).toBe(3);
    });

    it('4th: should handle an unknown number of numbers', () => {
        expect(calculator.add('1,2,3,4,5')).toBe(15);
    });

    it('5th: should handle newline as a delimiter along with commas', () => {
        const calc = new StringCalculator();
        expect(calc.add('1\n2,3')).toBe(6);
    });

    it('6th: should handle custom single-character delimiters', () => {
        const calc = new StringCalculator();
        expect(calc.add('//;\n1;2')).toBe(3);
    });

    it('7th: should handle custom delimiter of any length', () => {
        const calc = new StringCalculator();
        expect(calc.add('//[***]\n1***2***3')).toBe(6);
    });
    
});
