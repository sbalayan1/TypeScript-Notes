import * as _ from 'lodash'
import { zipWith } from 'lodash'


//static checking => checking for errors in code before running 
//static type checking => determining what's an error and what's not based on the kinds of values being operated on

//TypeScript checks a program for errors before execution, and does so based on the kinds of values, it’s a static type checker.
//TypeScript is a typed superset of Javascript meaning Javascript syntax is legal in TS and adds rules about how different kinds of values can be used. for instance

    const obj = {
        width: 25,
        height: 30
    }

    //console.log(obj.heigth) => results in a typeError. Not a syntax error

//TypeScript’s type checker is designed to allow correct programs through while still catching as many common errors as possible. 

//Primitive Data Types in JavaScript
/*
    - String
    - Number 
    - Null
    - Undefined
    - Symbol
    - Boolean
    - BigInt
*/
//Data Types extended from TypeScript
/*
    - any: allow anything
    - unknown: ensures a type is declared
    - never: not possible this type could happen
    - void: used to tell TypeScript that a function returns undefined or no return value
*/


//syntaxes for building types: Interfaces and Types

async function hello() {
    return 'hello world'
}

async function test2() {
    console.log('hello world')
    return 'test2'
}
test2()

let lucky: any = 23
lucky = '23'


//example of creating custom types
type Style1 = string
let font1: Style1;

//the below is called a union type
type Style2 = 'bold' | 'italic' | 23;
let font2: Style2 = 'bold'

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



class Emoji {
    constructor(public icon) {
        this.icon = icon
    }
}

const sun = new Emoji('😆')
console.log(sun)

var Emoji2 = (function() {
    function Emoji2(value) {
        this.value = value
    }

    return Emoji
}())

class Emoji3 {
    //create a private property called previous
    private _prev;

    constructor(private _icon) {
        this._icon = _icon
    }

    get icon() {
        return this._icon
    }

    //getter method to retrive that value
    get prev() {
        return this._prev
    }

    //mutates the icon value on the instance
    change(val) {

        //changes the previous value to the current icon. 
        this._prev = this._icon

        //changes the current icon to the change value.
        this._icon = val
    }
}

const emojiState = new Emoji3('😀')
console.log(emojiState.icon, emojiState.prev) //😀 undefined

emojiState.change('😁')
emojiState.change('😅')

console.log(emojiState.icon, emojiState.prev) // 😅 😁

console.log('this was transpiled')

//static methods
//static methods are on the class itself and are not methods on an instance of the class

class Emoji4 {

    //define a static method that adds 1 to the input argument
    static addOneTo(val) {
        return val + 1
    }
}

Emoji4.addOneTo(3)

//inheritance
class Human {
    constructor(public name){}

    sayHi() {
        return `Hello ${this.name}`
    }
}

const patrick = new Human('Patrick Mullot')
console.log(patrick.sayHi()) //=> Hello, Patrick Mullot

//assume we have other objects in our program that are similar to the human but need to implement other features based on what they were designed to do

//here the SuperHuman class inherits all of the Human class's functionality
class SuperHuman extends Human {
    heroName;
    //since there's an argument in the Human constructor, we need to do the same for the SH constructor
    constructor(name) {
        //super executes the code in the constructor of the parent class
        super(name)
        this.heroName = `Hero ${name}`
    }

    superpower() {
        return `${this.heroName} says hello world`
    }
}

const steph = new SuperHuman('Steph Curry')
steph.superpower() //=> Hero Steph Curry says hello world
steph.sayHi() //=> Hello, Steph Curry


//composition
//cocatenating objects together
//decouple properties or behaviors into objects or functions that return objects. Then merge all the objects together into a final function 
// usually referred to as mix-in pattern

//typescript gives us the flexibility to use mix-ins in a class based format

//imported from typescript documentation

//takes two arguments, first the base class and second the mix-in classes as an array. 
function applyMixins(derivedCtor: any, baseCtors: any[]) {

    //iterate over the array of mixins. 
    baseCtors.forEach((baseCtor) => {
        //iterate over the mixin's properties (including the class's constructor and methods)

        console.log(baseCtor.prototype)
        //we iterate over the baseCtor's prototype because its properties are in the prototype object
      Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
        //name represents each property of the current mixin class
        //derivedCtor.prototype[name] creates a new key within the base class's prototype. 
        derivedCtor.prototype[name] = baseCtor.prototype[name]

      });
    });
}

// function applyMixins(derivedCtor: any, baseCtors: any[]) {
//     baseCtors.forEach((baseCtor) => {
//       Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {

//         console.log('Before', name, derivedCtor.prototype[name], baseCtor.prototype[name])

//         Object.defineProperty(
//             derivedCtor.prototype,
//             name,
//             Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
//             Object.create(null)
//         );

        
//         console.log('After', name, derivedCtor.prototype[name], baseCtor.prototype[name])
//       });
//     });
// }

//create small behavior classes that define individual behaviors. These classes are concerned with what something does instead of what something is  
class CanSayHi {
    name;
    sayHi() {
        return `Hello, ${this.name}`
    }
}

class HasSuperPower {
    heroName;
    superpower() {
        return `${this.heroName} says hello world`
    }
}

//different from inheritance above, we instead implement multiple classes. When we implement something we are only concerned with its interface and not its underlying code

//the applyMixins function takes these interfaces and applies their code to this class
//note applyMixins leaves us some extra boilerplate code where have to type the return values on the methods for this class
class SuperHeroTest implements CanSayHi, HasSuperPower {
    heroName;

    constructor(public name) {
        this.heroName = `Super ${name}`;
    }

    //in this case, we have two methods, sayHi() and superpower(), both of which return strings.
    //the functions below specify the methods on the class and the datatype of their returns

    
    sayHi: () => string;
    superpower: () => string

}


// final step is to call the applyMixins function with the base class as the first argument and the mixed in classes as the second argument

applyMixins(SuperHeroTest, [CanSayHi, HasSuperPower])

const ts = new SuperHeroTest('TypeScript')
console.log(ts)
console.log(ts.sayHi())
console.log(ts.superpower())


//using interface declarations with classes
interface User {
    name: string;
    id: number;
}

class UserAccount {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name
        this.id = id
    }
}

const user: User = new UserAccount('Sean', 1)

//example of a use case for unknown
const jsonParserUnknown = (jsonString: string): unknown => JSON.parse(jsonString)

   // myOtherAccount.name
    //myOtherAccount can't be used until its type has been declared.

//const myOtherAccount = jsonParserUnknown(`{'name': 'Samuel'}`)

//below commented out to fix bypass bug
    // type UserUnknown = {name: string}
    // const myUserAccount = jsonParserUnknown(`{'name': 'Samuel'}`) as UserUnknown

    // myUserAccount.name

//what does AS do?


//Two main tools to declare shapes of an object: Interfaces and Types

    type Bird = {
        wings: 2
    }

    interface BirdInterface {
        wings: 2
    }

    const bird1: Bird = {wings: 2}
    const bird2: BirdInterface = {wings:2}

    //Types and interfaces can be intermixed
    const bird3: BirdInterface = bird1

    //Both can also extend other interfaces and types. Types do this via intersection types. Interfaces have a keyword

    type Owl = {nocturnal: true} & Bird
    type Robin = {nocturnal: false} & BirdInterface

    interface Peacock extends Bird {
        colorful: true;
        flies: false
    }

    interface Chicken extends BirdInterface {
        colorful: false;
        flies: false
    }

    const owl: Owl = {
        wings: 2, 
        nocturnal: true
    }

    const chicken: Chicken = {
        wings: 2,
        colorful: false,
        flies: false
    }

    //Use interfaces over type aliases because you will get better error messages. 

//Differences between interfaces and types
    //interfaces are open and types are closed. This means you can extend interfaces by declaring it a second time. Types oppositely, can't be changed outside of its declaration.

        interface Kitten {
            purrs: boolean
        }

        interface Kitten {
            color: string
        }

        type Puppy = {
            color: string
        }

        // type Puppy = {
        //     toys: number
        // }

//Composing Types
    //Complex types are created by combining simple ones using unions and generics

    //Unions: with unions, you can declare that a type will be one of many types. 

        type CustBoolean = true | false

        //A popular use case for Unions is to describe what set of String or Numbers a value is allowed to be.
        type WindowStates = 'open' | 'closed' | 'minimized'

        //notice how the below doesn't work
        //let windowOpen: WindowStates = 'broken'

        let windowOpen: WindowStates = 'open'

        //You can even use unions to handle different types. Imagine if you have a function that takes an array or a string as an argument. 

        //the function below takes an object as an argument who's type can either be a string or an array
        function getLength(obj: string | string[]) {
            return obj.length
        }
    
    //Generics
        //generally used in situations when you want to use a Type interally inside of a class or function. 
        //generics provide variables to types. 

        class Observable<T> {
            constructor(public value: T) {

            }
        }
        
        //T represents a variable called type that we can pass in to strong type the class's internal value. This allows us to specify the internal type at some later point in our code 

        let x: Observable<number>;
        let y: Observable<Person>;
        let z = new Observable(23); //does the same as the above, but instead implicitly sets the internal type to a number.

        //a common use for generics is with arrays. 

        type StringArray = Array<string>
        type NumArray = Array<number>
        type ObjectWithNameArray = Array<{name: string}>
        // the above generic describes that the a StringArray type, is an Array whose values are strings. 

        //notice how the below don't work
            //const testObjectArray: ObjectWithNameArray = ["word"]
            //const testObjectArray: ObjectWithNameArray = [{name:23}]

        //But this does work
            const testObjectArray: ObjectWithNameArray = [{name:"james brown"}]

        //You can also declare your own types that use generics

            //the below creates a backpack type using an interface. An interface is used to enforce the types shape. The type variable let's us pass a type into an instance of the Backpack type and set the types of its properties

        interface Backpack<Type> {
            add: (obj: Type) => void;
            get: () => Type;
        }

        //declare let's us declare backpack without initializing its value. the below creates a variable called backpack whose type is an object with a data property. The object's data property is a number This line is a shortcut to tell TypeScript there is a constant called `backpack`, and to not worry about where it came from.

            declare const backpack: Backpack<{data: number}>
            //you'll notice however that you run into this error when trying to use the above^
            //"Initializers are not allowed in ambient contexts"
        
            //The below is a way to work around the above. Here we declare a variable called backpack2 whose type is an object. Afterwards, we assign an object whose shape matches the Backpack interface. In a way the Backpack interface works similar to a class where backpack2 is an instance of the Backpack class and must come with all of the properties and methods of the Backpack class. 
            let backpack2: Backpack<{data: number}>
            backpack2 = {
                add: () => undefined, 
                get: () => {
                    return {data: 25}
                }
            }

            const object = backpack2.get()
            backpack2.add({data: 25})
            console.log("Generic backpack2", object)

            let backpack3: Backpack<string>
            backpack3 = {    
                add: () => undefined,
                get: () => "hello world"
            }

            console.log(backpack3.get())
            console.log("Generic backpack3", backpack3.add("Hello World"))


//Sturctural Type System
    //Duck Typing or Structural typing is where type checking focuses on the shape that values have. If two objects have the same shape, typescript considers the two to have the same type. 

    //the below defines a type whose properties are x and y. 
    interface Point {
        x: number;
        y: number;
    }

    //the below defines a function logPoint with parameter p whose type is a Point and console logs parameter p's properties
    function logPoint(p: Point) {
        console.log(`${typeof(p.x)}, ${p.y}`)
    }

    let point = {x: 23, y: 24}
    logPoint(point)
    //the above logs "23, 24"

    //Although point's type is never declared, typescript compares the shapes of Point and point in the type-check. Since they have the same shape, point's type is inferred to Point. 

    //What's more interesting is that shape-matching only requires a subset of the object's fields to match. See the example below

    let point2 = {x: 23, y: 24, z: 25}
    logPoint(point2) //=> "23, 24"

    let point3 = {x:23}
    
    //logPoint(point3) // => doesn't work because point3 is missing property y. 


    //Classes also conform to ducktyping
    class PointClass {
        //the below declares properties of a class.
        //the type declarations here take presidence over the constructor inputs. If x is declared a number type, we cannot strongly type the x parameter in the constructor to a string.
        x: number;
        y;

        //types are necessary in the constructor to strongly type the instances properties. without the types, the property types are inferred and users can input any types on instantiation.
        constructor(x, y) {
            this.x = x
            this.y = y
        }
    }

    //the below creates an instance of the PointClass that is an object with x and y as properties {x: "23", y: 24}. x is a string and y is a number.
    let point4 = new PointClass("word", 24)
    let point5 = new PointClass({name: "word"}, {name: "word"})
    let point6 = {x: {name:"word"}, y: {name:"word"} }

        //why does this work?
        logPoint(point4) // => string, 24
            //it seems like the property's type at declaration in a class overrules a property's actual type. Note if we change x's type to a string in our PointClass, the logPoint function doesn't work because point4's shape does not match the Point interface.
            //it also seems like classes work differently from objects. notice how point5 works with logPoint but point6 does not.
