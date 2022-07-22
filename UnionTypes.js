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
//Most importantly, Unions are composed using the intersection of its types' properties. Given two sets of properties, only the intersection of their properties applies to the union.
