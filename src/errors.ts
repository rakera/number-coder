export const ERRORS = {
    MIN_INPUT_LENGTH: "Input length must be at least 1",
    MAX_INPUT_LENGTH: "Input length must not exceed 16",
    NOT_INTEGER: "Input must be an integer",
    NOT_STRING: "Input must be a string",
    INVALID_LENGTH: (length: number): string => `Input must be ${length} characters`,
    NEGATIVE_NUMBER: "Input must not be a negative number",
    NOT_WHOLE_NUMBER: "Input must be a whole number",
    NOT_LATIN: "Input must contain only Latin letters",
    SHORT_CHARSET: `Charset length must be greater than 10 characters`,
    NOT_UNIQUE: "Input must contain only unique characters",
    CHAR_NOT_FOUND: (char: string): string => `Character "${char}" is not found in charset`,
};
