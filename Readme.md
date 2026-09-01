Typescript is built on top JS and it helps us catch so many errors before they hit the production.

TypeScript Setup
npm i -g typescript
tsc -v
npm init -y
npm i --save-dev typescript
npx tsc --init

npm i -g typescript → Install TypeScript globally.
tsc -v → Check TypeScript version.
npm init -y → Create package.json.
npm i --save-dev typescript → Install TypeScript locally as a dev dependency.
npx tsc --init → Create tsconfig.json.
tsc - This is the command how do you compile the code.
------------------------------------------------------------------------------------------------------------------

// Primitives
let userName: string = "Zeeshan";
let age: number = 26;
let isActive: boolean = true;
let bigNumber: bigint = 100n;
let uniqueId: symbol = Symbol("id");


// Null and Undefined (Null and Undefine are primitive types)
let nullValue: null = null;
let UndefinedValue: undefined = undefined;


// Arrays
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["Muhammad", "Zeeshan", "Ali"]


// Tuples
let person: [string, number] = ["Zeeshan", 26];


// Enum
enum Color {Red, Green, Blue,}
let favoriteColor: Color = Color.Blue;


// Any (Avoid when possible)
let randomValue: any = 10;
randomValue = "string";
randomValue = true;


// Unknown (safer than type any)
let userInput: unknown;
userInput = 5;
userInput = "text";


// Void (for functions that don't return)
function logMessage(message: string): void {
    console.log(message);
}


TypeScript Type Inference
Inference means TypeScript can automatically figure out the type of a value, so you don't always have to write the type yourself.
