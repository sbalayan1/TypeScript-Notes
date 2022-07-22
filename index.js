"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
//A type is the concept of describing what values can be passed and what can't. While Javascript provides dynamic typing, running the code and seeing what happens, static typing can be used to make predictions about what is expected before it runs
//basically Typescript is a tool that helps us find bugs before our code runs by using static checking. Typescript is a static type checker.
//static checking => checking for errors in code before running 
//static type checking => determining what's an error and what's not based on the kinds of values being operated on
//TypeScript checks a program for errors before execution, and does so based on the kinds of values. It’s a static type checker!
//TypeScript is a typed superset of Javascript meaning Javascript syntax is legal in TS and adds rules about how different kinds of values can be used. for instance
var obj = {
    width: 25,
    height: 30
};
//console.log(obj.heigth) => results in a typeError. Not a syntax error
//TypeScript’s type checker is designed to allow correct programs through while still catching as many common errors as possible. 
//tsc, the TypeScript Compiler
//The typescript compiler is our typechecker!
//tsc outputs an identical js file if no type errors occur. tsc compiles or transforms our ts file into js.
//Types for tooling
//While the type checker is great for catching bugs, it can also be used to prevent from making mistakes!
//the type checker has information we can use to check our work. It will tell us if we're accessing the right properties, suggest what properties we might want to use, and even provides error messages and code completion.
//Emitting with errors
//The gist here is that TypeScript assumes we know better than TypeScript. So in situations when there are type errors, the compiler will still run and transpile ts code to js. In short, TypeScript doesn't get in our way.
//To stop this from happening, do the following => tsc --noEmitOnError index.js
//Explicit Types
function greet(person, date) {
    console.log("Hello, ".concat(person, ", today is ").concat(date.toDateString()));
}
//here we added type annotations to person and date to describe what types of values greet() can be called with
//Erased Types
//TypeScript cannot be run on any browsers or runtimes unmodified. Furthermore, type annotations aren't part of JavaScript so how do we run TypeScript?!
//The compiler does this for us by basically stripping out the type annotations and transforming our ts code into plain vanilla js. That way, we can run our ts code in a browser!
//Downleveling
//TypeScript has the ability to rewrite code from newer versions of js like ES5 to older versions like ES3. This process of moving from a newer or “higher” version of ECMAScript down to an older or “lower” one is sometimes called downleveling.
//Strictness
//use the strictness settings to determine how thorough we want TS to be. 
//generally the default setting is where tsc stays out of our way but we can adjust that using strictness.
//strict: true in the tsconfig.json turns them all on simultaneously but we can opt out individually
//noImplicitAny: issues an error on variables whose types are implictly inferred as any
//Sometimes, TS doesn't infer a type and falls back to any. This defeats the purpose of typescript and can also create problems.
//strictNullChecks: makes handling null and undefined more explicitly so that we don't have to worry about whether we forgot to handle null and undefined.
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
    - Arrays: string[], number[], Array<number>
    - any: allow anything
        => typically used when you dont want a particular value to cause typechecking errors
        => When we assign a value a type of any, all of its properties are typed any.
        => using any basically disables all further type checking on a value.

    - unknown: ensures a type is declared
    - never: not possible this type could happen
    - void: used to tell TypeScript that a function returns undefined or no return value
*/
//Contextual Typing
//occurs when TypeScript is able to infer the types a function should have because of the context its used in
var names = ["Alic", "Bob", "Eve"];
//names.forEach(s => s.toUppercase()) => results in Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
names.forEach(function (s) { return s.toUpperCase(); });
//even though parameter s does not have a type annotation, typescript uses the inferred type of the forEach function and the array to determine the type of s. 
//Object Types
//any JavaScript value with properties
function printCord(pt) {
    console.log("The coordinate's x value is ".concat(pt.x));
    console.log("The coordinate's x value is ".concat(pt.y));
}
var personOptional = {
    first: "Sean",
    last: "John"
};
//note that JavaScript returns undefined when you access properties that don't exist. When you read from optional properties, you have to check for undefined before using it. 
console.log("personOptional", (_a = personOptional.dob) === null || _a === void 0 ? void 0 : _a.getDate);
//another example
function printName(obj) {
    //console.log(obj.last.toUpperCase()) => could crash if obj.last is not provided. notice how we get obj.last is possibly undefined.
}
printName({ first: "sean" }); //notice this doesn't throw an error. 
//solution to the above
function printName2(obj) {
    var _a;
    console.log((_a = obj.last) === null || _a === void 0 ? void 0 : _a.toUpperCase());
}
printName2({ first: "sean" });
//Union Types
//union types are a means to combine types. These types are formed from two or more other types. The types within a union type are called union members
function printId(id) {
    console.log("Your ID is: ".concat(id));
}
printId(23);
printId("string");
printId({ id: 23 });
//It's important to note that TypeScript only lets you use methods that are available to all union members. 
function printId2(ids) {
    //console.log(ids.map(id => {}) => property map does not exist on type object
}
//To solve the above, we can 'narrow' the code. Narrowing occurs when TypeScript can deduce a more specific type for a value based on the structure of the code
function printId3(id) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    }
    else {
        console.log(id);
    }
}
//syntaxes for building types: Interfaces and Types
function hello() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, 'hello world'];
        });
    });
}
function test2() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('hello world');
            return [2 /*return*/, 'test2'];
        });
    });
}
test2();
var lucky = 23;
lucky = '23';
var font1;
var font2 = 'bold';
//notice how now, font is only assignable to either bold, italic, or 23
// font = 'something'
//more often though, you’ll be strongly typing objects with multiple properties with different types
// assume we have two objects whose shape has a first and last name with string types
//composing objects or classes with incorrect shapes is an easy way to create bugs
var person = {
    first: 'Jeff',
    last: 'Delaney'
};
var person2 = {
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
var arr = [];
//the above for instance creates an array and forces the array to only have number types. the brackets next to number signifies that the variable is an array
//arr.push(1)
//arr.push('23')// notice how we get errors whenever we push values that are not numbers
// arr.push(false)
//The above is particularly useful when working with an array of objects and you want to ensure the objects you're working with are identical. 
var arr2 = [];
var arr4 = [];
var Emoji = /** @class */ (function () {
    function Emoji(icon) {
        this.icon = icon;
        this.icon = icon;
    }
    return Emoji;
}());
var sun = new Emoji('😆');
console.log(sun);
var Emoji2 = (function () {
    function Emoji2(value) {
        this.value = value;
    }
    return Emoji;
}());
var Emoji3 = /** @class */ (function () {
    function Emoji3(_icon) {
        this._icon = _icon;
        this._icon = _icon;
    }
    Object.defineProperty(Emoji3.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Emoji3.prototype, "prev", {
        //getter method to retrive that value
        get: function () {
            return this._prev;
        },
        enumerable: false,
        configurable: true
    });
    //mutates the icon value on the instance
    Emoji3.prototype.change = function (val) {
        //changes the previous value to the current icon. 
        this._prev = this._icon;
        //changes the current icon to the change value.
        this._icon = val;
    };
    return Emoji3;
}());
var emojiState = new Emoji3('😀');
console.log(emojiState.icon, emojiState.prev); //😀 undefined
emojiState.change('😁');
emojiState.change('😅');
console.log(emojiState.icon, emojiState.prev); // 😅 😁
console.log('this was transpiled');
//static methods
//static methods are on the class itself and are not methods on an instance of the class
var Emoji4 = /** @class */ (function () {
    function Emoji4() {
    }
    //define a static method that adds 1 to the input argument
    Emoji4.addOneTo = function (val) {
        return val + 1;
    };
    return Emoji4;
}());
Emoji4.addOneTo(3);
//inheritance
var Human = /** @class */ (function () {
    function Human(name) {
        this.name = name;
    }
    Human.prototype.sayHi = function () {
        return "Hello ".concat(this.name);
    };
    return Human;
}());
var patrick = new Human('Patrick Mullot');
console.log(patrick.sayHi()); //=> Hello, Patrick Mullot
//assume we have other objects in our program that are similar to the human but need to implement other features based on what they were designed to do
//here the SuperHuman class inherits all of the Human class's functionality
var SuperHuman = /** @class */ (function (_super) {
    __extends(SuperHuman, _super);
    //since there's an argument in the Human constructor, we need to do the same for the SH constructor
    function SuperHuman(name) {
        var _this = 
        //super executes the code in the constructor of the parent class
        _super.call(this, name) || this;
        _this.heroName = "Hero ".concat(name);
        return _this;
    }
    SuperHuman.prototype.superpower = function () {
        return "".concat(this.heroName, " says hello world");
    };
    return SuperHuman;
}(Human));
var steph = new SuperHuman('Steph Curry');
steph.superpower(); //=> Hero Steph Curry says hello world
steph.sayHi(); //=> Hello, Steph Curry
//composition
//cocatenating objects together
//decouple properties or behaviors into objects or functions that return objects. Then merge all the objects together into a final function 
// usually referred to as mix-in pattern
//typescript gives us the flexibility to use mix-ins in a class based format
//imported from typescript documentation
//takes two arguments, first the base class and second the mix-in classes as an array. 
function applyMixins(derivedCtor, baseCtors) {
    //iterate over the array of mixins. 
    baseCtors.forEach(function (baseCtor) {
        //iterate over the mixin's properties (including the class's constructor and methods)
        console.log(baseCtor.prototype);
        //we iterate over the baseCtor's prototype because its properties are in the prototype object
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            //name represents each property of the current mixin class
            //derivedCtor.prototype[name] creates a new key within the base class's prototype. 
            derivedCtor.prototype[name] = baseCtor.prototype[name];
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
var CanSayHi = /** @class */ (function () {
    function CanSayHi() {
    }
    CanSayHi.prototype.sayHi = function () {
        return "Hello, ".concat(this.name);
    };
    return CanSayHi;
}());
var HasSuperPower = /** @class */ (function () {
    function HasSuperPower() {
    }
    HasSuperPower.prototype.superpower = function () {
        return "".concat(this.heroName, " says hello world");
    };
    return HasSuperPower;
}());
//different from inheritance above, we instead implement multiple classes. When we implement something we are only concerned with its interface and not its underlying code
//the applyMixins function takes these interfaces and applies their code to this class
//note applyMixins leaves us some extra boilerplate code where have to type the return values on the methods for this class
var SuperHeroTest = /** @class */ (function () {
    function SuperHeroTest(name) {
        this.name = name;
        this.heroName = "Super ".concat(name);
    }
    return SuperHeroTest;
}());
// final step is to call the applyMixins function with the base class as the first argument and the mixed in classes as the second argument
applyMixins(SuperHeroTest, [CanSayHi, HasSuperPower]);
var ts = new SuperHeroTest('TypeScript');
console.log(ts);
console.log(ts.sayHi());
console.log(ts.superpower());
var UserAccount = /** @class */ (function () {
    function UserAccount(name, id) {
        this.name = name;
        this.id = id;
    }
    return UserAccount;
}());
var user = new UserAccount('Sean', 1);
//example of a use case for unknown
var jsonParserUnknown = function (jsonString) { return JSON.parse(jsonString); };
var bird1 = { wings: 2 };
var bird2 = { wings: 2 };
//Types and interfaces can be intermixed
var bird3 = bird1;
var owl = {
    wings: 2,
    nocturnal: true
};
var chicken = {
    wings: 2,
    colorful: false,
    flies: false
};
//notice how the below doesn't work
//let windowOpen: WindowStates = 'broken'
var windowOpen = 'open';
//You can even use unions to handle different types. Imagine if you have a function that takes an array or a string as an argument. 
//the function below takes an object as an argument who's type can either be a string or an array
function getLength(obj) {
    return obj.length;
}
//Generics
//generally used in situations when you want to use a Type interally inside of a class or function. 
//generics provide variables to types. 
var Observable = /** @class */ (function () {
    function Observable(value) {
        this.value = value;
    }
    return Observable;
}());
//T represents a variable called type that we can pass in to strong type the class's internal value. This allows us to specify the internal type at some later point in our code 
var x;
var y;
var z = new Observable(23); //does the same as the above, but instead implicitly sets the internal type to a number.
// the above generic describes that the a StringArray type, is an Array whose values are strings. 
//notice how the below don't work
//const testObjectArray: ObjectWithNameArray = ["word"]
//const testObjectArray: ObjectWithNameArray = [{name:23}]
//But this does work
var testObjectArray = [{ name: "james brown" }];
//you'll notice however that you run into this error when trying to use the above^
//"Initializers are not allowed in ambient contexts"
//The below is a way to work around the above. Here we declare a variable called backpack2 whose type is an object. Afterwards, we assign an object whose shape matches the Backpack interface. In a way the Backpack interface works similar to a class where backpack2 is an instance of the Backpack class and must come with all of the properties and methods of the Backpack class. 
var backpack2;
backpack2 = {
    add: function () { return undefined; },
    get: function () {
        return { data: 25 };
    }
};
var object = backpack2.get();
backpack2.add({ data: 25 });
console.log("Generic backpack2", object);
var backpack3;
backpack3 = {
    add: function () { return undefined; },
    get: function () { return "hello world"; }
};
console.log(backpack3.get());
console.log("Generic backpack3", backpack3.add("Hello World"));
//the below defines a function logPoint with parameter p whose type is a Point and console logs parameter p's properties
function logPoint(p) {
    console.log("".concat(typeof (p.x), ", ").concat(p.y));
}
var point = { x: 23, y: 24 };
logPoint(point);
//the above logs "23, 24"
//Although point's type is never declared, typescript compares the shapes of Point and point in the type-check. Since they have the same shape, point's type is inferred to Point. 
//What's more interesting is that shape-matching only requires a subset of the object's fields to match. See the example below
var point2 = { x: 23, y: 24, z: 25 };
logPoint(point2); //=> "23, 24"
var point3 = { x: 23 };
//logPoint(point3) // => doesn't work because point3 is missing property y. 
//Classes also conform to ducktyping
var PointClass = /** @class */ (function () {
    //types are necessary in the constructor to strongly type the instances properties. without the types, the property types are inferred and users can input any types on instantiation.
    function PointClass(x, y) {
        this.x = x;
        this.y = y;
    }
    return PointClass;
}());
//the below creates an instance of the PointClass that is an object with x and y as properties {x: "23", y: 24}. x is a string and y is a number.
var point4 = new PointClass("word", 24);
var point5 = new PointClass({ name: "word" }, { name: "word" });
var point6 = { x: { name: "word" }, y: { name: "word" } };
//why does this work?
logPoint(point4); // => string, 24
//it seems like the property's type at declaration in a class overrules a property's actual type. Note if we change x's type to a string in our PointClass, the logPoint function doesn't work because point4's shape does not match the Point interface.
//it also seems like classes work differently from objects. notice how point5 works with logPoint but point6 does not.
