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
        expect(calculator.add('1\n2,3')).toBe(6);
    });

    it('6th: should handle custom single-character delimiters', () => {
        expect(calculator.add('//;\n1;2')).toBe(3);
    });

    it('7th: should handle custom delimiter of any length', () => {
        expect(calculator.add('//[***]\n1***2***3')).toBe(6);
    });

    it('8th: should handle multiple custom delimiters', () => {
        expect(calculator.add('//[*][%]\n1*2%3')).toBe(6);
    });

    it('9th: should raise an exception for negative numbers', () => {
        expect(() => calculator.add('1,-2,3,-4')).toThrow('Negatives not allowed: -2, -4');
    });

    it('10th: should throw error if invalid (non-numeric) token is found', () => {
        expect(() => calculator.add('1,a,3')).toThrow('Invalid input: "a" is not a number.');
    });
    
    it('11th: should throw error if empty delimiter definition is provided', () => {
        expect(() => calculator.add('//\n1,2')).toThrow('Invalid delimiter definition');
    });

    it('12th: should ignore1 numbers greater than 1000', () => {
        expect(calculator.add('2,1001,3')).toBe(5);
    });

    it('13th: should return 0 if custom delimiter is defined but no numbers provided', () => {
        expect(calculator.add('//;\n')).toBe(0);
    });

    it('14th: should handle consecutive newlines correctly', () => {
        // Multiple newlines that result in empty tokens are just filtered out
        expect(calculator.add('1\n\n2,3')).toBe(6);
    });

    it('15th: should handle multiple delimiters even if one is empty brackets (malformed)', () => {
        expect(() => calculator.add('//[***][]\n1***2')).toThrow('Invalid delimiter definition: empty delimiter found.');
    });

    it('16th: should handle large inputs', () => {
        const largeInput = Array.from({length: 100}, (_, i) => i+1).join(',');
        // sum of 1 to 100 = 5050
        expect(calculator.add(largeInput)).toBe(5050);
    });
});
