# String Calculator

A **String Calculator** implementation in TypeScript that sums up numbers provided in a string with various configurable delimiters. This project closely follows the Test-Driven Development (TDD) approach, ensuring reliable, maintainable, and well-tested code.

## Table of Contents
1. [Key Features](#key-features)
2. [Project Structure](#project-structure)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Running the Project](#running-the-project)
6. [Testing](#testing)
7. [Development Approach (TDD)](#development-approach-tdd)
8. [Edge Cases & Error Handling](#edge-cases--error-handling)

## Key Features

- **Empty String Input:** Returns `0`.
- **Single Number Input:** Returns the number itself.
- **Multiple Numbers (Comma-Separated):** Sums an arbitrary amount of numbers separated by commas.
- **Newline as a Delimiter:** Supports using `\n` in addition to commas.
- **Custom Delimiters:** Allows defining a custom delimiter using the format `//<delimiter>\n<numbers>`.
- **Multiple and Multi-length Delimiters:** Supports delimiters of any length and multiple delimiters simultaneously using `//[delim1][delim2]\n...`.
- **Negative Numbers:** Throws an error listing all negative numbers if encountered.
- **Numbers Greater Than 1000:** Ignores numbers greater than 1000.
- **Invalid Input Handling:** Throws errors for malformed inputs, such as invalid (non-numeric) tokens, empty delimiter definitions, or malformed custom delimiters.

## Project Structure

```
.
├─ src
│  └─ stringCalculator.ts   // The main StringCalculator class implementation
└─ tests
   └─ stringCalculator.test.ts // Jest test suite covering all scenarios
```

- **`src/stringCalculator.ts`**: Contains the `StringCalculator` class with a modular, refactored `add()` method and private helper methods for parsing and validation.
- **`tests/stringCalculator.test.ts`**: Contains a comprehensive set of Jest tests verifying each requirement and edge case.

## Prerequisites

- **Node.js (>=14)**: Ensure Node.js and npm are installed on your machine.
- **npm**: Comes bundled with Node.js.
- **TypeScript** & **Jest**: The project relies on TypeScript for static typing and Jest for testing.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yashpriyam/string_calculator.git
   cd string_calculator
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

   This installs all necessary dependencies including `typescript`, `jest`, and `ts-jest`.

3. **Compile TypeScript (if needed):**
   Although tests run through Jest with `ts-jest` directly, you can manually compile TypeScript if you wish:
   ```bash
   npx tsc
   ```
   If you do this, you'll also need to configure an `outDir` folder in `tsconfig.json` file

## Running the Project

While this project is primarily a library (a single class) and doesn’t have a running "app", you can interact with it through a Node REPL or by creating a small script:

```bash
node
> const { StringCalculator } = require('./dist/stringCalculator');
> const calc = new StringCalculator();
> calc.add('1,2,3'); // Returns 6
```

*(If you run from `dist/` directory after compilation. If running directly, see `ts-node` usage or similar.)*

## Testing

**Run all tests:**
```bash
npm test
```

This executes the entire test suite via Jest. You should see a report of all passing and failing tests. All tests are expected to pass with the final implementation.

## Development Approach (TDD)

This project was developed using a strict Test-Driven Development methodology:

1. **Write a Failing Test:** For each new requirement, write a test that fails initially.
2. **Make the Test Pass:** Implement the minimal code to pass the test.
3. **Refactor:** Improve the code structure, design, and readability while keeping all tests green.
4. **Repeat for Next Requirement.**

Over time, the code evolves from a minimal implementation to a robust, well-structured solution that passes all tests.

## Edge Cases & Error Handling

The code and tests cover various edge cases:

- **Empty Input String:** Returns `0` without errors.
- **Empty Custom Delimiter Definition (e.g. `//\n1,2`):** Throws `Invalid delimiter definition` error.
- **Non-Numeric Tokens (e.g. `1,a,3`):** Throws `Invalid input: "a" is not a number.` error.
- **Negative Numbers (e.g. `1,-2,3`):** Throws `Negatives not allowed: -2` error.
- **Empty Delimiter in Multiple Delimiters (e.g. `//[***][]\n1***2`):** Throws `Invalid delimiter definition: empty delimiter found.` error.
- **Numbers > 1000:** Are simply ignored in the sum.
- **Large Inputs:** Efficiently sums large sequences of numbers.
