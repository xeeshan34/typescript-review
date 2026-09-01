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