import { CONSTANTS } from "./constants";
import { ERRORS } from "./errors";
import {
    LengthValidator,
    NumberValidator,
    StringValidator,
} from "./validators";
import { Charset } from "./charset";

export interface NumberCoderOptions {
    inputLength?: number;
    charset?: string;
}

export class NumberCoder {
    private readonly inputLength: number;
    private readonly charset: Charset;
    private readonly stringValidator: StringValidator;

    constructor(options: NumberCoderOptions = {}) {
        const inputLength: number = options.inputLength ?? CONSTANTS.INPUT_LENGTH;
        LengthValidator.validate(inputLength);
        this.inputLength = inputLength;

        const charsetValue: string = options.charset ?? CONSTANTS.CHARSET;
        this.charset = new Charset(charsetValue);
        this.stringValidator = new StringValidator(charsetValue);
    }

    public encode(num: number): string {
        NumberValidator.validate(num, this.inputLength);

        const charsetArray: string[] = this.createCharsetArray(this.charset.getCharset());
        const numString: string = num.toString();

        return numString
            .split('')
            .map((digit: string) => this.encodeDigit(digit, charsetArray))
            .join('');
    }

    public decode(code: string): number {
        this.stringValidator.validate(code, this.inputLength);

        const charsetArray: string[] = this.createCharsetArray(this.charset.getCharset());
        const numCode: string = code
            .split('')
            .map((char: string) => this.decodeChar(char, charsetArray))
            .join('');

        return parseInt(numCode);
    }

    private createCharsetArray(charset: string): string[] {
        const arraySize: number = 10;
        const charsetArray: string[] = Array.from({ length: arraySize }, () => "");

        for (let i = 0; i < charset.length; i++) {
            const index: number = i % arraySize;
            charsetArray[index] += charset[i];
        }

        return charsetArray;
    }

    private encodeDigit(digit: string, charsetArray: string[]): string {
        const digitIndex: number = parseInt(digit);
        const charsetForDigit: string = charsetArray[digitIndex];
        return charsetForDigit[this.getRandomIndex(charsetForDigit)];
    }

    private decodeChar(char: string, charsetArray: string[]): number {
        const index: number = charsetArray.findIndex((chunk: string) => chunk.includes(char));
        if (index < 0 || index > 9) throw new Error(ERRORS.CHAR_NOT_FOUND(char));
        return index;
    }

    private getRandomIndex(str: string): number {
        const length: number = str.length;
        return Math.floor(Math.random() * length);
    }
}
