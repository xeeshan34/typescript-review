# TypeScript Notes 📘

Personal notes and code snippets while learning **TypeScript** — a strongly typed superset of JavaScript that helps catch errors at compile time instead of in production.

---

## Table of Contents

- [Setup](#setup)
- [Primitive Types](#primitive-types)
- [Arrays & Tuples](#arrays--tuples)
- [Enums](#enums)
- [Any vs Unknown vs Void](#any-vs-unknown-vs-void)
- [Type Inference](#type-inference)
- [Functions](#functions)
- [Objects & Interfaces](#objects--interfaces)
- [Type Aliases](#type-aliases)
- [Union & Intersection Types](#union--intersection-types)
- [Literal Types](#literal-types)
- [Type Assertions & Type Guards](#type-assertions--type-guards)
- [Classes](#classes)
- [Generics](#generics)
- [Utility Types](#utility-types)
- [Enums (Deep Dive)](#enums-deep-dive)
- [Async / Await](#async--await)
- [Best Practices](#best-practices)

---

## Setup

Install TypeScript and initialize a project:

```bash
# Install TypeScript globally
npm i -g typescript

# Check installed version
tsc -v

# Create a package.json
npm init -y

# Install TypeScript as a dev dependency (recommended per-project)
npm i --save-dev typescript

# Generate a tsconfig.json
npx tsc --init
```

| Command | Description |
|---|---|
| `npm i -g typescript` | Install TypeScript globally |
| `tsc -v` | Check the installed TypeScript version |
| `npm init -y` | Create a `package.json` file |
| `npm i --save-dev typescript` | Install TypeScript locally as a dev dependency |
| `npx tsc --init` | Create a `tsconfig.json` file |
| `tsc` | Compile TypeScript (`.ts`) files into JavaScript |

---

## Primitive Types

```typescript
let userName: string = "Zeeshan";
let age: number = 26;
let isActive: boolean = true;
let bigNumber: bigint = 100n;
let uniqueId: symbol = Symbol("id");

// null and undefined are also primitive types
let nullValue: null = null;
let undefinedValue: undefined = undefined;
```

## Arrays & Tuples

```typescript
// Arrays
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["Muhammad", "Zeeshan", "Ali"];

// Tuples — fixed-length arrays with known types at each position
let person: [string, number] = ["Zeeshan", 26];
```

## Enums

```typescript
enum Color {
  Red,
  Green,
  Blue,
}

let favoriteColor: Color = Color.Blue;
```

## Any vs Unknown vs Void

```typescript
// any — disables type checking entirely (avoid when possible)
let randomValue: any = 10;
randomValue = "string";
randomValue = true;

// unknown — safer alternative to 'any'; must be narrowed before use
let userInput: unknown;
userInput = 5;
userInput = "text";

// void — for functions that don't return a value
function logMessage(message: string): void {
  console.log(message);
}
```

> 💡 **Tip:** Prefer `unknown` over `any`. It forces you to check the type before using the value, keeping type safety intact.

## Type Inference

TypeScript can automatically figure out the type of a value from its initial assignment, so you don't always need to annotate it explicitly.

```typescript
let city = "Lahore"; // inferred as string, no annotation needed
```

## Functions

```typescript
// Basic function with types
function add(a: number, b: number): number {
  return a + b;
}

// Optional parameters
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return `${greeting}, ${name}!`;
  }
  return `Hello, ${name}!`;
}

console.log(greet("Zeeshan"));          // Hello, Zeeshan!
console.log(greet("Ali", "Hi"));        // Hi, Ali!

// Default parameters
function multiply(a: number, b: number = 1): number {
  return a * b;
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

// Arrow functions
const divide = (a: number, b: number): number => a / b;

// Function types
let calculate: (x: number, y: number) => number;
calculate = add;
```

## Objects & Interfaces

```typescript
// Object type annotation
let user: { name: string; age: number } = {
  name: "Zeeshan",
  age: 26,
};

// Interface
interface User {
  name: string;
  age: number;
  email?: string;     // optional property
  readonly id: number; // readonly property
}

let newUser: User = {
  id: 1,
  name: "Zeeshan",
  age: 25,
};

// newUser.id = 2; // ❌ Error: Cannot assign to 'id' because it is read-only

// Interface with methods
interface Product {
  name: string;
  price: number;
  getDiscount(percentage: number): number;
}

let laptop: Product = {
  name: "MacBook Pro",
  price: 2000,
  getDiscount(percentage: number): number {
    return this.price * (percentage / 100);
  },
};
```

## Type Aliases

```typescript
// Type alias for an object shape
type Point = {
  x: number;
  y: number;
};

let point: Point = { x: 10, y: 20 };

// Type alias for a union of primitives
type ID = string | number;

let userId: ID = "zeeshan123";
let productId: ID = 456;
```

### Type Alias vs Interface

```typescript
// Interfaces can be extended
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

let myDog: Dog = {
  name: "Buddy",
  breed: "Golden Retriever",
};

// Interfaces can be declared multiple times — they merge (declaration merging)
interface Animal {
  age: number;
}

let dog: Animal = {
  age: 3,
  name: "Buddy",
};
```

| | Interface | Type Alias |
|---|---|---|
| Extending | ✅ via `extends` | ✅ via `&` (intersection) |
| Declaration merging | ✅ yes | ❌ no |
| Best for | Object shapes | Unions, intersections, primitives |

> **Rule of thumb:** Use `interface` for object shapes and `type` for unions, intersections, and utility types.

## Union & Intersection Types

```typescript
// Union types (OR) — value can be one of several types
type Status = "pending" | "approved" | "rejected";

function setStatus(status: Status): void {
  console.log(`Status set to: ${status}`);
}

setStatus("approved");
// setStatus("completed"); // ❌ Error!

type StringOrNumber = string | number;

function printId(id: StringOrNumber): void {
  if (typeof id === "string") {
    console.log(`ID (string): ${id.toUpperCase()}`);
  } else {
    console.log(`ID (number): ${id}`);
  }
}

// Intersection types (AND) — combines multiple types into one
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;

let myCircle: ColorfulCircle = {
  color: "red",
  radius: 10,
};
```

## Literal Types

```typescript
// String literal types
let direction: "north" | "south" | "east" | "west";
direction = "north"; // ✅ OK
// direction = "up"; // ❌ Error!

// Numeric literal types
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;

// Combining literals with other types (discriminated unions)
type SuccessResponse = {
  status: "success";
  data: any;
};

type ErrorResponse = {
  status: "error";
  message: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;
```

## Type Assertions & Type Guards

```typescript
// Type assertions — tell TypeScript "trust me, I know the type"
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;
// or
let strLength2: number = (<string>someValue).length;

// Custom type guard
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: string | number): void {
  if (isString(value)) {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

// instanceof type guard
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat): void {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

## Classes

```typescript
class Person {
  // Properties
  private name: string;
  protected age: number;
  public email: string;

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  public introduce(): string {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}

// Shorter syntax using parameter properties
class Employee {
  constructor(
    private id: number,
    public name: string,
    protected department: string
  ) {}

  getDetails(): string {
    return `${this.name} works in ${this.department}`;
  }
}

let zeeshan = new Employee(101, "Zeeshan", "Engineering");
console.log(zeeshan.getDetails()); // Zeeshan works in Engineering

// Inheritance
class Manager extends Employee {
  constructor(
    id: number,
    name: string,
    department: string,
    private teamSize: number
  ) {
    super(id, name, department);
  }

  getTeamInfo(): string {
    return `${this.name} manages ${this.teamSize} people`;
  }
}

// Abstract classes — cannot be instantiated directly
abstract class Shape {
  constructor(public color: string) {}

  abstract getArea(): number;

  displayColor(): void {
    console.log(`This shape is ${this.color}`);
  }
}

class Rectangle extends Shape {
  constructor(color: string, private width: number, private height: number) {
    super(color);
  }

  getArea(): number {
    return this.width * this.height;
  }
}
```

### Access Modifiers

| Modifier | Accessible from |
|---|---|
| `public` (default) | Anywhere |
| `private` | Only within the same class |
| `protected` | Within the class and its subclasses |
| `readonly` | Can be read but not reassigned after initialization |

## Generics

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("myString");
let output2 = identity<number>(100);

// Generic with arrays
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

let firstNumber = getFirstElement([1, 2, 3]);            // number
let firstName = getFirstElement(["Zeeshan", "Developer"]); // string

// Generic interfaces
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

let stringNumberPair: KeyValuePair<string, number> = {
  key: "age",
  value: 26,
};

// Generic classes
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T): void {
    this.data.push(item);
  }

  removeItem(item: T): void {
    this.data = this.data.filter((i) => i !== item);
  }

  getItems(): T[] {
    return [...this.data];
  }
}

let textStorage = new DataStorage<string>();
textStorage.addItem("Hello");
textStorage.addItem("World");

// Generic constraints — restrict T to types that have a 'length' property
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");   // ✅ OK
logLength([1, 2, 3]); // ✅ OK
// logLength(123);    // ❌ Error: number doesn't have a 'length' property
```

## Utility Types

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  assignedTo: string;
}

// Partial<T> — makes all properties optional
type PartialTodo = Partial<Todo>;
let updateTodo: PartialTodo = {
  completed: true,
};

// Required<T> — makes all properties required
type RequiredTodo = Required<Todo>;

// Readonly<T> — makes all properties readonly
type ReadonlyTodo = Readonly<Todo>;
let myTodo: ReadonlyTodo = {
  title: "Learn TypeScript",
  description: "Complete tutorial",
  completed: false,
  createdAt: new Date(),
  assignedTo: "Zeeshan",
};
// myTodo.completed = true; // ❌ Error!

// Pick<T, Keys> — pick specific properties
type TodoPreview = Pick<Todo, "title" | "completed">;
let preview: TodoPreview = {
  title: "My Todo",
  completed: false,
};

// Omit<T, Keys> — omit specific properties
type TodoWithoutDate = Omit<Todo, "createdAt">;

// Record<Keys, Type> — construct an object type with specific keys and a value type
type PageInfo = {
  title: string;
  url: string;
};

type Pages = "home" | "about" | "contact";
let pages: Record<Pages, PageInfo> = {
  home: { title: "Home", url: "/" },
  about: { title: "About", url: "/about" },
  contact: { title: "Contact", url: "/contact" },
};

// ReturnType<T> — extract the return type of a function
function createUser() {
  return {
    id: 1,
    name: "Zeeshan",
    email: "zeeshan@gmail.com",
  };
}

type UserType = ReturnType<typeof createUser>;
```

| Utility Type | What it does |
|---|---|
| `Partial<T>` | Makes all properties optional |
| `Required<T>` | Makes all properties required |
| `Readonly<T>` | Makes all properties readonly |
| `Pick<T, K>` | Selects a subset of properties |
| `Omit<T, K>` | Excludes a subset of properties |
| `Record<K, T>` | Builds an object type with keys `K` and values `T` |
| `ReturnType<T>` | Extracts a function's return type |

## Enums (Deep Dive)

```typescript
// Numeric enum — auto-increments from the first value
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

// String enum
enum ResponseStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

// Const enum — inlined at compile time, more performant
const enum HttpStatus {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

function handleResponse(status: HttpStatus): void {
  if (status === HttpStatus.OK) {
    console.log("Success!");
  }
}
```

## Async / Await

```typescript
// Promise with TypeScript
function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: "Zeeshan" });
    }, 1000);
  });
}

// Async/await
async function getUserData(id: number): Promise<void> {
  try {
    const user = await fetchUser(id);
    console.log(user.name);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

// Generic async function
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}
```

## Best Practices

```typescript
// ✅ DO: Enable strict mode in tsconfig.json
// "strict": true

// ✅ DO: Prefer interfaces for object shapes
interface Developer {
  id: number;
  name: string;
  skills: string[];
}

const zeeshanAli: Developer = {
  id: 1,
  name: "Zeeshan",
  skills: ["React", "TypeScript", "Next.js"],
};

// ✅ DO: Use 'type' for unions and utility types
type Id = string | number;

// ✅ DO: Avoid 'any' — use 'unknown' when the type is truly unknown
function processVal(value: unknown): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}

// ✅ DO: Use 'const' for values that won't be reassigned
const MAX_USERS = 100;

// ✅ DO: Use 'readonly' for immutable properties
interface Config {
  readonly apiKey: string;
  readonly author: string;
}

const config: Config = {
  apiKey: "abc123",
  author: "Zeeshan",
};

// ❌ DON'T: Use 'any' unless absolutely necessary
// let data: any = fetchData();

// ❌ DON'T: Silence errors with @ts-ignore — fix the underlying issue instead
```

### Quick Checklist

- [x] Enable `strict` mode in `tsconfig.json`
- [x] Prefer `interface` for object shapes, `type` for unions/intersections
- [x] Avoid `any`; reach for `unknown` and narrow it
- [x] Use `readonly` and `const` wherever values shouldn't change
- [x] Avoid `@ts-ignore` — understand and fix the error instead

---

*Notes compiled while learning TypeScript. Contributions and corrections welcome!*