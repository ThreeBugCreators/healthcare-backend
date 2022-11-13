/* eslint-disable no-undef */
const mathOperations = {
    sum(a, b) {
        return a + b;
    },
    diff(a, b) {
        return a - b;
    },
    product(a, b) {
        return a * b;
    },
    divide(a, b) {
        return a / b;
    },
};

describe('Calculator Tests', () => {
    test('Addition of 2 numbers', () => {
        // Arrange and act
        const result = mathOperations.sum(1, 2);

        // Assert
        expect(result).toBe(3);
    });

    test('Subtraction of 2 numbers', () => {
        // Arrange and act
        const result = mathOperations.diff(10, 2);

        // Assert
        expect(result).toBe(8);
    });

    test('Multiplication of 2 numbers', () => {
        // Arrange and act
        const result = mathOperations.product(2, 8);

        // Assert
        expect(result).toBe(16);
    });

    test('Division of 2 numbers', () => {
        // Arrange and act
        const result = mathOperations.divide(24, 8);

        // Assert
        expect(result).toBe(3);
    });
});
