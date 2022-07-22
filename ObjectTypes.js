var _a;
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
