import * as _ from 'lodash'

async function hello() {
    console.log('hello world')
}

let lucky: any = 23
lucky = '23'


//example of creating custom types
// type Style = string
// let font: Style;

//the below is called a union type
type Style = 'bold' | 'italic' | 23;
let font: Style = 'bold'

//notice how now, font is only assignable to either bold, italic, or 23
// font = 'something'

//more often though, you’ll be strongly typing objects with multiple properties with different types

// assume we have two objects whose shape has a first and last name with string types
//composing objects or classes with incorrect shapes is an easy way to create bugs

const person: Person = {
    first: 'Jeff',
    last: 'Delaney'
}

const person2: Person = {
    first: 'Usain',
    last: 'Bolt', 
}

//with typescript we can enforce shape of an object using an interface. 
//if we know that the shape of an object will always be the same, then we can define interface that defines the types on each property
//now we can use this interface to type the objects above directle, use it as an argument, use it as the return value for our function, or anywhere else in our code

interface Person {
    first: string;
    last: string
}


//sometimes an interface can be restrictive. however we can actually maintain the required properties and add additional properties by doing the below

interface Person {
    first: string;
    last: string;
    [key: string]: any
}

//strongly typed functions
//what we've done below is explicitly strongly typed our arguments to number data types and our return to a string. This ensures that only numbers can be passed and our function only returns a string
//notice if you don't have the toString(), our TypeScript returns an error because we'd be returning a number
function pow(x: number, y: number): string {
    return Math.pow(x, y).toString()
}

pow(5, 10)

//in cases where functions don't return a value or create a side effect, you can type your function's return value to void
function test(): void {
    console.log('hello world')
}

//typically you'll see void types on event listeners and side effects that don't return a value

//Strongly Typed Arrays
const arr: number[] = []
//the above for instance creates an array and forces the array to only have number types. the brackets next to number signifies that the variable is an array

//arr.push(1)
//arr.push('23')// notice how we get errors whenever we push values that are not numbers
// arr.push(false)

//The above is particularly useful when working with an array of objects and you want to ensure the objects you're working with are identical. 

const arr2: Person[] = [] 


//tuples
//tuples are fixed length arrays where each item has its own type

type MyList = [number, string, boolean]

//const arr3: MyList = []
//the above throws an error because we are initializing as an empty array. The compiler expects all of the values to be defined upfront
//to fix this, use the ?
//The ? can be used in other places as well. For instance, you can use the ? syntax to make function arguments optional

type MyList2 = [number?, string?, boolean?]
const arr4: MyList2 = []


//Generics
//generally used in situations when you want to use a Type interally inside of a class or function

class Observable<T> {
    constructor(public value: T) {

    }
}
//T represents a variable type that we can pass in to strong type the class's internal value
//This allows us to specify the internal type at some later point in our code 

let x: Observable<number>;
let y: Observable<Person>;
let z = new Observable(23); //does the same as the above, but instead implicitly sets the internal type to a number.