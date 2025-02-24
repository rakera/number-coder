import { CONSTANTS } from "./constants";
import { ERRORS } from "./errors";

export class LengthValidator {
    public static validate(inputLength: number): void {
        if (inputLength > CONSTANTS.MAX_INPUT_LENGTH) throw new Error(ERRORS.MAX_INPUT_LENGTH);
        if (inputLength < 1) throw new Error(ERRORS.MIN_INPUT_LENGTH);
    }
}

export class NumberValidator {
    public static validate(input: number, inputLength: number): void {
        if (typeof input !== "number") throw new Error(ERRORS.NOT_INTEGER);
        if (!Number.isInteger(input)) throw new Error(ERRORS.NOT_WHOLE_NUMBER);
        if (input < 0) throw new Error(ERRORS.NEGATIVE_NUMBER);
        if (String(input).length !== inputLength) throw new Error(ERRORS.INVALID_LENGTH(inputLength));
    }
}

export class StringValidator {
    private readonly charset: string;

    constructor(charset: string) {
        this.charset = charset;
    }

    public validate(input: string, inputLength: number): void {
        if (typeof input !== "string") throw new Error(ERRORS.NOT_STRING);
        if (input.length !== inputLength) throw new Error(ERRORS.INVALID_LENGTH(inputLength));

        for (const char of input) {
            if (!this.charset.includes(char)) throw new Error(ERRORS.CHAR_NOT_FOUND(char));
        }
    }
}
