# TypeScript Notes

TypeScript is a **superset of JavaScript** built on top of JavaScript. It adds **static typing**, which helps us catch many errors during development and before they reach production.

TypeScript code is eventually **compiled/transpiled into JavaScript**, which can then run in browsers, Node.js, and other JavaScript environments.

---

# TypeScript Setup

## 1. Install TypeScript Globally

```bash
npm install -g typescript
```

This installs TypeScript globally so that the `tsc` command can be used from anywhere in the terminal.

---

## 2. Check TypeScript Version

```bash
tsc -v
```

Checks the currently installed TypeScript version.

---

## 3. Initialize a Node.js Project

```bash
npm init -y
```

Creates a `package.json` file with default configuration.

---

## 4. Install TypeScript Locally

```bash
npm install --save-dev typescript
```

Installs TypeScript as a **development dependency** in the current project.

Using a local installation is generally preferred for projects because everyone working on the project can use the same TypeScript version.

---

## 5. Create `tsconfig.json`

```bash
npx tsc --init
```

Creates a `tsconfig.json` file.

`tsconfig.json` contains the configuration options that tell TypeScript how to compile the project.

---

## TypeScript Commands

| Command          | Purpose                                       |
| ---------------- | --------------------------------------------- |
| `tsc -v`         | Check TypeScript version                      |
| `tsc`            | Compile TypeScript files                      |
| `npx tsc`        | Run the locally installed TypeScript compiler |
| `npx tsc --init` | Create `tsconfig.json`                        |

### What is `tsc`?

`tsc` stands for **TypeScript Compiler**.

It is used to compile TypeScript (`.ts`) code into JavaScript (`.js`).

For example:

```bash
tsc app.ts
```

If `app.ts` contains:

```ts
let message: string = "Hello TypeScript";
console.log(message);
```

TypeScript can compile it into JavaScript that can be executed by a JavaScript runtime.

---

# TypeScript Types

TypeScript provides different types that help us describe what kind of values a variable can contain.

---

## 1. Primitive Types

### String

```ts
let userName: string = "Zeeshan";
```

The variable can only contain a string.

---

### Number

```ts
let age: number = 26;
```

The `number` type represents integers and floating-point numbers.

```ts
let score: number = 95;
let price: number = 99.99;
```

---

### Boolean

```ts
let isActive: boolean = true;
```

A boolean can contain either:

```ts
true
```

or

```ts
false
```

---

### BigInt

```ts
let bigNumber: bigint = 100n;
```

`bigint` is used for integers larger than the range safely supported by JavaScript's `number` type.

The `n` at the end makes the value a BigInt.

---

### Symbol

```ts
let uniqueId: symbol = Symbol("id");
```

A `symbol` creates a unique value that can be used as an object property key.

---

# Null and Undefined

`null` and `undefined` are also primitive values in JavaScript.

```ts
let nullValue: null = null;

let undefinedValue: undefined = undefined;
```

With strict TypeScript settings enabled, these types are handled separately from other types.

For example:

```ts
let userName: string = "Zeeshan";
```

The variable cannot normally be assigned `null` or `undefined` when `strictNullChecks` is enabled.

---

# Arrays

There are two common ways to define an array type.

### Using `type[]`

```ts
let numbers: number[] = [1, 2, 3, 4, 5];
```

This means the array can contain only numbers.

```ts
let names: string[] = ["Muhammad", "Zeeshan", "Ali"];
```

---

### Using `Array<T>`

```ts
let names: Array<string> = ["Muhammad", "Zeeshan", "Ali"];
```

Both of the following mean essentially the same thing:

```ts
let numbers: number[] = [1, 2, 3];

let numbers2: Array<number> = [1, 2, 3];
```

---

# Tuples

A tuple is an array where the **number of elements and their types are known and fixed by position**.

```ts
let person: [string, number] = ["Zeeshan", 26];
```

Here:

* First element must be a `string`
* Second element must be a `number`

For example:

```ts
let person: [string, number] = ["Zeeshan", 26];
```

This would be incorrect:

```ts
let person: [string, number] = [26, "Zeeshan"];
```

because the order of the types is wrong.

---

# Enum

An `enum` allows us to define a set of named constants.

```ts
enum Color {
    Red,
    Green,
    Blue
}

let favoriteColor: Color = Color.Blue;
```

By default, numeric enum members start from `0`.

So:

```ts
Color.Red   // 0
Color.Green // 1
Color.Blue  // 2
```

---

# Any

The `any` type effectively disables TypeScript's type checking for that value.

```ts
let randomValue: any = 10;

randomValue = "string";
randomValue = true;
```

The variable can contain values of different types.

### Avoid `any` when possible

Although `any` can be useful in some situations, using it too much removes one of TypeScript's biggest benefits: **type safety**.

For example:

```ts
let value: any = "hello";

value.toFixed(); // TypeScript will not complain
```

This can cause a runtime error because strings do not have a `toFixed()` method.

---

# Unknown

`unknown` is a safer alternative to `any`.

```ts
let userInput: unknown;

userInput = 5;
userInput = "text";
userInput = true;
```

Like `any`, an `unknown` variable can contain values of different types.

However, TypeScript **does not allow us to use an `unknown` value without first checking its type**.

For example:

```ts
let userInput: unknown = "Hello";

if (typeof userInput === "string") {
    console.log(userInput.toUpperCase());
}
```

This makes `unknown` much safer than `any`.

### `any` vs `unknown`

| `any`                  | `unknown`                          |
| ---------------------- | ---------------------------------- |
| Disables type checking | Keeps type safety                  |
| Can be used directly   | Must be narrowed before use        |
| Less safe              | Safer                              |
| Avoid when possible    | Preferred for truly unknown values |

---

# Void

`void` is commonly used for functions that **do not return a value**.

```ts
function logMessage(message: string): void {
    console.log(message);
}
```

The function performs an action but does not return a value.

---

# Type Inference

**Type inference** means TypeScript can automatically determine the type of a value without us explicitly writing the type.

For example:

```ts
let userName = "Zeeshan";
```

TypeScript automatically infers:

```ts
string
```

So this:

```ts
let userName = "Zeeshan";
```

is effectively treated as:

```ts
let userName: string = "Zeeshan";
```

---

## More Type Inference Examples

```ts
let age = 26;
// inferred as number

let isActive = true;
// inferred as boolean

let numbers = [1, 2, 3];
// inferred as number[]

let user = {
    name: "Zeeshan",
    age: 26
};
// inferred as { name: string; age: number }
```

Because TypeScript can often infer types automatically, we don't need to explicitly annotate every variable.

---

# Explicit Typing vs Type Inference

### Explicit Typing

We manually specify the type:

```ts
let age: number = 26;
```

### Type Inference

TypeScript determines the type automatically:

```ts
let age = 26;
```

In many cases, type inference makes the code cleaner while still providing type safety.

---

# Quick Summary

| Type        | Example            | Purpose                      |
| ----------- | ------------------ | ---------------------------- |
| `string`    | `"Zeeshan"`        | Text                         |
| `number`    | `26`               | Numbers                      |
| `boolean`   | `true`             | True/false                   |
| `bigint`    | `100n`             | Large integers               |
| `symbol`    | `Symbol()`         | Unique values                |
| `null`      | `null`             | Intentional absence of value |
| `undefined` | `undefined`        | Value not assigned           |
| `array`     | `number[]`         | Collection of values         |
| `tuple`     | `[string, number]` | Fixed structure              |
| `enum`      | `Color.Blue`       | Named constants              |
| `any`       | `any`              | Disables type checking       |
| `unknown`   | `unknown`          | Safe unknown value           |
| `void`      | `void`             | No return value              |

---

# Key Takeaways

* TypeScript is a **superset of JavaScript**.
* TypeScript adds **static type checking** to JavaScript.
* TypeScript code is compiled into JavaScript.
* `tsc` is the **TypeScript compiler**.
* `tsconfig.json` contains TypeScript compiler configuration.
* Type inference allows TypeScript to determine types automatically.
* Prefer `unknown` over `any` when the type is genuinely unknown.
* Use explicit type annotations when they improve clarity or when TypeScript cannot infer the desired type.
