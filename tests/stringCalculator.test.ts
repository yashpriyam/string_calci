// tests/StringCalculator.test.ts
import { StringCalculator } from '../src/stringCalculator';

describe('StringCalculator', () => {
    let calculator: StringCalculator;

    beforeEach(() => {
        calculator = new StringCalculator();
    });

    it('should return 0 if string is passed', () => {
        expect(calculator.add('')).toBe(0);
    });
});
