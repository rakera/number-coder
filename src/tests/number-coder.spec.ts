import { NumberCoder, NumberCoderOptions } from "../number-coder";
import { ERRORS } from "../errors";
import { CONSTANTS } from "../constants";

describe("NumberCoder", () => {
    describe("Constructor", () => {
        it("creates instance with default options", () => {
            const coder: NumberCoder = new NumberCoder();
            expect(coder).toBeInstanceOf(NumberCoder);
        });

        it("creates instance with custom inputLength and charset", () => {
            const options: NumberCoderOptions = {
                inputLength: 4,
                charset: "ABCDEFGHIJ",
            };
            const coder: NumberCoder = new NumberCoder(options);
            expect(coder).toBeInstanceOf(NumberCoder);
        });

        it("throws error if inputLength exceeds 16", () => {
            const options: NumberCoderOptions = { inputLength: 17 };
            expect(() => new NumberCoder(options)).toThrow(ERRORS.MAX_INPUT_LENGTH);
        });

        it("throws error if inputLength is less than 1", () => {
            const options: NumberCoderOptions = { inputLength: 0 };
            expect(() => new NumberCoder(options)).toThrow(ERRORS.MIN_INPUT_LENGTH);
        });

        it("throws error if charset is too short", () => {
            const options: NumberCoderOptions = { charset: "ABC" };
            expect(() => new NumberCoder(options)).toThrow(ERRORS.SHORT_CHARSET);
        });

        it("throws error if charset has duplicates", () => {
            const options: NumberCoderOptions = { charset: "AABBCCDDFF" };
            expect(() => new NumberCoder(options)).toThrow(ERRORS.NOT_UNIQUE);
        });

        it("uses default inputLength from CONSTANTS", () => {
            const coder: NumberCoder = new NumberCoder();
            const encoded: string = coder.encode(123456);
            expect(encoded.length).toBe(CONSTANTS.INPUT_LENGTH);
        });
    });

    describe("encode", () => {
        it("encodes a valid number correctly", () => {
            const coder: NumberCoder = new NumberCoder();
            const encoded: string = coder.encode(123456);
            expect(encoded).toHaveLength(6);
            expect(typeof encoded).toBe("string");
        });

        it("throws error for negative numbers", () => {
            const coder: NumberCoder = new NumberCoder();
            expect(() => coder.encode(-123456)).toThrow(ERRORS.NEGATIVE_NUMBER);
        });

        it("throws error for non-integer numbers", () => {
            const coder: NumberCoder = new NumberCoder();
            expect(() => coder.encode(123.456)).toThrow(ERRORS.NOT_WHOLE_NUMBER);
        });

        it("throws error for numbers with wrong length", () => {
            const coder: NumberCoder = new NumberCoder({ inputLength: 4 });
            expect(() => coder.encode(12345)).toThrow(ERRORS.INVALID_LENGTH(4));
        });

        it("produces different outputs for the same input", () => {
            const coder: NumberCoder = new NumberCoder();
            const encoded1: string = coder.encode(123456);
            const encoded2: string = coder.encode(123456);
            expect(encoded1).not.toBe(encoded2);
            expect(encoded1).toHaveLength(6);
            expect(encoded2).toHaveLength(6);
        });
    });

    describe("decode", () => {
        it("decodes a valid encoded string back to the original number", () => {
            const coder: NumberCoder = new NumberCoder();
            const encoded: string = coder.encode(123456);
            const decoded: number = coder.decode(encoded);
            expect(decoded).toBe(123456);
        });

        it("throws error for strings with wrong length", () => {
            const coder: NumberCoder = new NumberCoder({ inputLength: 6 });
            expect(() => coder.decode("ABC")).toThrow(ERRORS.INVALID_LENGTH(6));
        });

        it("throws error for non-string input", () => {
            const coder: NumberCoder = new NumberCoder();
            expect(() => coder.decode(123 as any)).toThrow(ERRORS.NOT_STRING);
        });

        it("throws error for invalid characters", () => {
            const coder: NumberCoder = new NumberCoder({ charset: "ABCDEFGHIJ", inputLength: 4 });
            expect(() => coder.decode("ABCK")).toThrow(ERRORS.CHAR_NOT_FOUND("K"));
        });
    });
});