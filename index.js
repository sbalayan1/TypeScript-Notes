async function hello() {
    return 'hello world';
}
async function test2() {
    console.log('hello world');
    return 'test2';
}
test2();
let lucky = 23;
lucky = '23';
let font = 'bold';
//notice how now, font is only assignable to either bold, italic, or 23
// font = 'something'
//more often though, you’ll be strongly typing objects with multiple properties with different types
// assume we have two objects whose shape has a first and last name with string types
//composing objects or classes with incorrect shapes is an easy way to create bugs
const person = {
    first: 'Jeff',
    last: 'Delaney'
};
const person2 = {
    first: 'Usain',
    last: 'Bolt',
};
//strongly typed functions
//what we've done below is explicitly strongly typed our arguments to number data types and our return to a string. This ensures that only numbers can be passed and our function only returns a string
//notice if you don't have the toString(), our TypeScript returns an error because we'd be returning a number
function pow(x, y) {
    return Math.pow(x, y).toString();
}
pow(5, 10);
//in cases where functions don't return a value or create a side effect, you can type your function's return value to void
function test() {
    console.log('hello world');
}
//typically you'll see void types on event listeners and side effects that don't return a value
//Strongly Typed Arrays
const arr = [];
//the above for instance creates an array and forces the array to only have number types. the brackets next to number signifies that the variable is an array
//arr.push(1)
//arr.push('23')// notice how we get errors whenever we push values that are not numbers
// arr.push(false)
//The above is particularly useful when working with an array of objects and you want to ensure the objects you're working with are identical. 
const arr2 = [];
const arr4 = [];
//Generics
//generally used in situations when you want to use a Type interally inside of a class or function
class Observable {
    value;
    constructor(value) {
        this.value = value;
    }
}
//T represents a variable type that we can pass in to strong type the class's internal value
//This allows us to specify the internal type at some later point in our code 
let x;
let y;
let z = new Observable(23); //does the same as the above, but instead implicitly sets the internal type to a number.
class Emoji {
    icon;
    constructor(icon) {
        this.icon = icon;
        this.icon = icon;
    }
}
const sun = new Emoji('😆');
console.log(sun);
var Emoji2 = (function () {
    function Emoji2(value) {
        this.value = value;
    }
    return Emoji;
}());
class Emoji3 {
    _icon;
    //create a private property called previous
    _prev;
    constructor(_icon) {
        this._icon = _icon;
        this._icon = _icon;
    }
    get icon() {
        return this._icon;
    }
    //getter method to retrive that value
    get prev() {
        return this._prev;
    }
    //mutates the icon value on the instance
    change(val) {
        //changes the previous value to the current icon. 
        this._prev = this._icon;
        //changes the current icon to the change value.
        this._icon = val;
    }
}
const emojiState = new Emoji3('😀');
console.log(emojiState.icon, emojiState.prev); //😀 undefined
emojiState.change('😁');
emojiState.change('😅');
console.log(emojiState.icon, emojiState.prev); // 😅 😁
console.log('this was transpiled');
//static methods
//static methods are on the class itself and are not methods on an instance of the class
class Emoji4 {
    //define a static method that adds 1 to the input argument
    static addOneTo(val) {
        return val + 1;
    }
}
Emoji4.addOneTo(3);
//inheritance
class Human {
    name;
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `Hello ${this.name}`;
    }
}
const patrick = new Human('Patrick Mullot');
console.log(patrick.sayHi()); //=> Hello, Patrick Mullot
//assume we have other objects in our program that are similar to the human but need to implement other features based on what they were designed to do
//here the SuperHuman class inherits all of the Human class's functionality
class SuperHuman extends Human {
    heroName;
    //since there's an argument in the Human constructor, we need to do the same for the SH constructor
    constructor(name) {
        //super executes the code in the constructor of the parent class
        super(name);
        this.heroName = `Hero ${name}`;
    }
    superpower() {
        return `${this.heroName} says hello world`;
    }
}
const steph = new SuperHuman('Steph Curry');
steph.superpower(); //=> Hero Steph Curry says hello world
steph.sayHi(); //=> Hello, Steph Curry
//composition
//cocatenating objects together
//decouple properties or behaviors into objects or functions that return objects. Then merge all the objects together into a final function 
// usually referred to as mix-in pattern
//typescript gives us the flexibility to use mix-ins in a class based format
//imported from typescript documentation
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            console.log(name, derivedCtor, baseCtor);
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
// function applyMixins(derivedCtor: any, constructors: any[]) {
//     constructors.forEach((baseCtor) => {
//       Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
//         Object.defineProperty(
//           derivedCtor.prototype,
//           name,
//           Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
//             Object.create(null)
//         );
//       });
//     });
// }
//create small behavior classes that define individual behaviors. These classes are concerned with what something does instead of what something is  
class CanSayHi {
    name;
    sayHi() {
        return `Hello, ${this.name}`;
    }
}
class HasSuperPower {
    heroName;
    superpower() {
        return `${this.heroName} says hello world`;
    }
}
//different from inheritance above, we instead implement multiple classes. When we implement something we are only concerned with its interface and not its underlying code
//the applyMixins function takes these interfaces and applies their code to this class
//note applyMixins leaves us some extra boilerplate code where have to type the return values on the methods for this class
class SuperHeroTest {
    name;
    heroName;
    constructor(name) {
        this.name = name;
        this.heroName = `Super ${name}`;
    }
    //in this case, we have two methods, sayHi() and superpower(), both of which return strings
    sayHi;
    superpower;
}
// final step is to call the applyMixins function with the base class as the first argument and the mixed in classes as the second argument
applyMixins(SuperHeroTest, [CanSayHi, HasSuperPower]);
const ts = new SuperHeroTest('TypeScript');
console.log(ts);
console.log(ts.sayHi());
//export {};
