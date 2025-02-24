import { ERRORS } from "./errors";

export class Charset {
    private readonly charset: string;

    constructor(charset: string) {
        Charset.validate(charset);
        this.charset = Charset.shuffle(charset);
    }

    private static validate(charset: string): void {
        const charsetMinLength: number = 10;

        if (charset.length < charsetMinLength) {
            throw new Error(ERRORS.SHORT_CHARSET);
        }

        if (new Set(charset).size !== charset.length) {
            throw new Error(ERRORS.NOT_UNIQUE);
        }
    }


    private static shuffle(str: string): string {
        return str
            .split('')
            .map((char: string, i: number) => ({
                char,
                weight: (char.charCodeAt(0) * 17 + i * 31) % str.length
            }))
            .sort((a, b) => a.weight - b.weight)
            .map(item => item.char)
            .join('');
    }

    public getCharset(): string {
        return this.charset;
    }
}
