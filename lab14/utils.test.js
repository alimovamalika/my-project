const { sumOfSquares, reverseString, findMinBroken } = require('./utils');

describe("sumOfSquares tests", () => {
    test("correct result", () => {
        expect(sumOfSquares([1, 2, 3])).toBe(14);
    });
});

describe("reverseString tests", () => {
    test("reverses string", () => {
        expect(reverseString("ABC")).toBe("CBA");
    });
});

describe("findMinBroken tests", () => {
    test("should fail (function broken)", () => {
        expect(findMinBroken([5, 1, -3])).toBe(-3);
    });
});