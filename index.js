"use strict";
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
exports.__esModule = true;
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
var font = 'bold';
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
    last: 'Bolt'
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
//Generics
//generally used in situations when you want to use a Type interally inside of a class or function
var Observable = /** @class */ (function () {
    function Observable(value) {
        this.value = value;
    }
    return Observable;
}());
//T represents a variable type that we can pass in to strong type the class's internal value
//This allows us to specify the internal type at some later point in our code 
var x;
var y;
var z = new Observable(23); //does the same as the above, but instead implicitly sets the internal type to a number.
