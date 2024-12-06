// tests/StringCalculator.test.ts
import { StringCalculator } from '../src/stringCalculator';

describe('StringCalculator', () => {
    let calculator: StringCalculator;

    beforeEach(() => {
        calculator = new StringCalculator();
    });

    it('should return 0 if empty string is passed', () => {
        expect(calculator.add('')).toBe(0);
    });

    it('should return the number itself if only one number is provided', () => {
        expect(calculator.add('1')).toBe(1);
    });

    it('should return sum of two comma-separated numbers', () => {
        expect(calculator.add('1,2')).toBe(3);
    });

    it('should handle an unknown number of numbers', () => {
        expect(calculator.add('1,2,3,4,5')).toBe(15);
    });
});
