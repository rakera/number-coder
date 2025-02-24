# NumberCoder

[GitHub Repository](https://github.com/rakera/number-coder)

A lightweight TypeScript library for encoding numbers into fixed-length codes and decoding them back. The library supports customizable code length and character sets, making it flexible for various use cases.

## Features

- Encodes integers into strings of a specified length using a custom or default character set.
- Decodes strings back into their original numbers.
- Input validation for numbers and codes.
- Configurable code length and character set.

## Installation

Install the library via npm:

```bash
npm install number-coder
```

## Usage

### Basic Example
Encode and decode numbers using default settings (6 characters, alphanumeric charset):
```
const { NumberCoder } = require("number-coder");

const coder = new NumberCoder();
const encoded = coder.encode(123456); // e.g., "ZnCKY7"
console.log(`Encoded: ${encoded}`);
const decoded = coder.decode("ZnCKY7"); // 123456
console.log(`Decoded: ${decoded}`);
```
### Custom Configuration
Specify a custom code length and character set:
```
const { NumberCoder } = require("number-coder");

const coder = new NumberCoder({
    inputLength: 4,              // 4-character codes
    charset: "ABCDEFGHIJ"        // Custom charset (min 10 unique characters)
});
const encoded = coder.encode(1234); // e.g., "ACFD"
console.log(`Encoded: ${encoded}`);
const decoded = coder.decode("ACFD"); // 1234
console.log(`Decoded: ${decoded}`);
```

## API
`new NumberCoder(options?: NumberCoderOptions)`

Creates an instance of the `NumberCoder` class.

### Parameters:
- **`options`** (optional): An object with the following properties:
  - **`inputLength`** (optional, number): The length of the input number and resulting code. Must be between `1` and `16`. Defaults to `6`.
  - **`charset`** (optional, string): The character set used for encoding. Must contain at least 10 unique characters. Defaults to `"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"`.

  
### Example:

```
const { NumberCoder } = require("number-coder");

const coder = new NumberCoder({ inputLength: 7, charset: "ABCDEFGHIJK" });
```

### encode(number)
Encodes a number into a fixed-length string.

Parameters
 - **number**: A non-negative integer with exactly `inputLength` digits.

Returns
 - A string of length `inputLength` composed of characters from the specified `charset`.

### Example:

```
const { NumberCoder } = require("number-coder");

const coder = new NumberCoder();
const result = coder.encode(135487); // e.g., "3Vjbo9"
```

### decode(code)
Decodes a string back into its original number.

Parameters
 - `code`: A string of length `inputLength` containing only characters from the specified `charset`.
Returns
 - The original number as an integer.
### Example:

```
const { NumberCoder } = require("number-coder");

const coder = new NumberCoder();
const result = coder.decode("3Vjbo9"); // 135487
```

## Requirements

 - **Input Number**: Must be a non-negative integer with a digit count equal to **inputLength**.
 - **Code**: Must be a string of length inputLength containing only characters from the specified **charset**.
 - **Charset**: Must be a string with at least **`10` unique characters**.
 - **Input Length**: Must be between `1` and `16` (inclusive).

## Error Handling

The library throws errors for invalid inputs. Below are possible error messages:

 - `"Input must be an integer"`: The input to encode is not a number.
 - `"Input must be a whole number"`: The input to encode contains decimals.
 - `"Input must not be a negative number"`: The input to encode is negative.
 - `"Input must be ${length} characters"`: The input number or code length does not match `inputLength`.
 - `"Input must be a string"`: The input to decode is not a string.
 - `"Charset length must be greater than 10 characters"`: The provided charset is too short.
 - `"Input must contain only unique characters"`: The provided charset contains duplicate characters.
 - `"Character '${char}' is not found in charset"`: A character in the code is not present in the charset.
 - `"Input length must not exceed 16"`: The specified `inputLength` is greater than 16.
 - `"Input length must be at least 1"`: The specified `inputLength` is less than 1.

### Example of Error Handling

TypeScript:
```
import { NumberCoder } from "number-coder";

try {
    const coder: NumberCoder = new NumberCoder();
    coder.encode(-123); // Throws "Input must not be a negative number"
} catch (error: unknown) {
    console.error((error as Error).message);
}
```

JavaScript:
```
const { NumberCoder } = require("number-coder");

try {
    const coder = new NumberCoder();
    coder.encode(-123); // Throws "Input must not be a negative number"
} catch (error) {
    console.error(error.message);
}
```

## Technical Details

 - When encoding a number, the resulting code is randomly generated and will differ with each call due to internal charset randomization.
 - The decoding process reverses this mapping by identifying the original digit based on the character's position in the `charset` subsets.
 - The maximum `inputLength` is limited to `16` to ensure compatibility with JavaScript's `Number.MAX_SAFE_INTEGER` (approximately 9e15), beyond which integer precision may be lost.

## Development Setup

If you want to work with the library's source code (e.g., for testing or modification):

 - Ensure you have Node.js and npm installed.
 - Install dependencies and build the library:

```bash
npm install
npm run build
```

 - The compiled output will be in the dist/ directory.
 - (Optional) Run the test suite to verify functionality:

```bash
npm test
```

 - (Optional) Create a test file (e.g., test-coder.ts or test-coder.js) in the project root to try it out:

TypeScript:

```
import { NumberCoder } from "./dist";

const coder: NumberCoder = new NumberCoder();

const encodeInput: number = 123456; // Input value here
const encodeValue: string = coder.encode(encodeInput);
console.log(`Encoded input ${encodeInput}: ${encodeValue}`);

const decodeInput: string = encodeValue;
const decodeValue: number = coder.decode(decodeInput);
console.log(`Decoded input ${decodeInput}: ${decodeValue}`);
```

Run it with:

```bash
npx ts-node test-coder.ts
```

JavaScript:

```
const { NumberCoder } = require("./dist");

const coder = new NumberCoder();

const encodeInput = 123456; // Input value here
const encodeValue = coder.encode(encodeInput);
console.log(`Encoded input ${encodeInput}: ${encodeValue}`);

const decodeInput = encodeValue;
const decodeValue = coder.decode(decodeInput);
console.log(`Decoded input ${decodeInput}: ${decodeValue}`);
```

Run it with:

```bash
node test-coder.js
```

## License

MIT License. See [LICENSE](./LICENSE) for details.

## Author
[rakera](https://github.com/rakera/)