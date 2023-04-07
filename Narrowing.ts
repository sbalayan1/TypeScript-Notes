//Narrowing
    //essentially using type guards to refine types to more specific types. TypeScript is able to recognize when we refine and NARROW types to more specific types

    //below is a function called padLeft. padLeft has two parameters, padding and input. padding can be either a number or a string and input must be a string. 
    function padLeft(padding: number | string, input: string) {
        //return "".repeat(padding) + input //Argument of type 'string | number' is not assignable to parameter of type 'number'. Type 'string' is not assignable to type 'number'. TypeScript warns us here that adding number | string to a number might not give us what we want. 

        //To fix, we can use type checking to narrow padding's type
        if (typeof padding === 'number') {
            return "".repeat(padding) + input //(parameter) padding: number
        }
      

        return padding + input //(parameter) padding: string
    }

//typeof type guards
    // "string"
    // "number"
    // "bigint"
    // "boolean"
    // "symbol"
    // "undefined"
    // "object"
    // "function"


    //Also be aware that typeof null, resolves to object! That's why you don't see it in the list of type guards above. Notice how the below errs with 

    function printAll(strs: string | string[] | null) {
        //console.log(typeof null) => 'object'

        if (typeof strs === "object") {
            for (const s of strs) {//strs is possibly null
                console.log(s)
            }
        } else if (typeof strs === "string") {
            console.log(strs)
        }

        console.log(typeof strs)
    }


    //also, typeof string[] resolves to "object"

//Truthiness Narrowing
    //In JavaScript, constructs like if, first coerce their conditions to booleans to make sense of them. 
    //To coerce a value to a boolean, you can run them through the Boolean function or use double Boolean negation. 
    Boolean("hello") //=> type: boolean, value: true
    !!"hello" //=> type: true, value: true

    //with the Boolean class, TypeScript infers a type of Boolean and returns true
    //with a double boolean negation, TypeScript infers a type literal of true and returns true

    //The below leverages double boolean negation to check if the strs variable is not null and is an object
    function printAllDoubleBool(strs: string | string[] | null) {
        if (!!strs && typeof strs === "object") { //if (!!strs ....) is the same as if(strs ....)
            for (const s of strs) {
                console.log(s)
            }
        } else if (typeof strs === "string") {
            console.log(strs)
        }


    }

//equality narrowing
    //TLDR: you can use equalities and switch statements to narrow types. By following the equality checks below, we are able to see how TypeScript narrows strs types, using the equality checks
    function printAllEqualityNarrowing(strs: string | string[] | null) {
        //(parameter) strs: string | string[] | null
        if (strs !== null) { // (parameter) strs: string | string[]
            if (typeof strs === 'object') {// (parameter) strs: string | string[]
                for (const s of strs) {//(parameter) strs: string[]
                    console.log(s)
                }
            }
        }
    }

    //another important note is that TypeScript also checks whether a value can be null OR undefined
    interface Container {
        value: number | null | undefined
    }

    function multiplyValue(container: Container, factor: number) {
        if (container.value !== null) {//if you hover over value you'll see, (property) Container.value: number. Notice how null AND undefined are removed. This is an example of how TypeScript checks and narrows for null and undefined
            return container.value * factor
        }
    }

//'In' operator narrowing
type Fish = {swim: () => void, name: string} //Fish is a type with a property called swim. Swim is a function that returns void
type Bird = {fly: () => void, name: string} //Bird is a type with a property called fly. Fly is a function that returns void

//animal is a union type. It can be either a fish or a bird
function move(animal: Fish | Bird) {
    if ("swim" in animal) { //using the in operator, we narrow the animal's type to Fish! Note that the in operator narrows to types which have an optional swim property or a required simw property!
        return animal.swim()
    }

    return animal.fly()
}

//To iterate the statement above. Here we create a Human type who can SWIM AND FLY
type Human = {
    swim?: () => void,
    fly?: () => void
}

function moveFaster(animal: Fish | Bird | Human ) {
    if ("swim" in animal) {
        animal//(parameter) animal: Fish | Human
        //as you can see, animal can be either Fish or Human, even though swim is an optional parameter for the Human Type. 
    } else {
        animal //(parameter) animal: Bird | Human
    }
}

//The “true” branch narrows animals’s types which have either an optional or required property called 'swim', and the “false” branch narrows to types which have an optional or missing property called 'swim'. Since, 'swim' is optional in the Human type, TypeScript narrows to Human on both branches


//Assignments
    //TypeScript uses the a variable's declared type to figure out assignability. What does that mean? Take the example below   
    let x: string | number

    x = 5
    x = "a string"

    //the two above work because x's declared type is string and number
    x = true //this fails because boolean is not one of TypeScript's declared types! Thus boolean is not assignable to string | number


//Control Flow Analysis
    //TLDR: analysis of code based on reachability. TypeScript uses this flow analysis to narrow types as it encounters type guards and assignments. When control flow splits and remerges, the variable can be observed and analyzed at these points to have different types!

    function example() {
        let x: string | boolean | number;

        x = Math.random() < 0.5
        console.log(x) //let x: boolean

        if (Math.random() < 0.5) {
            x = "hello"
            console.log(x) //let x: string
        } else {
            x = 100
            console.log(x) //let x: number
        }

        return x //let x: number | string
    }

//Using type predicates
    //One use for type predicates are user defined type guards. These type guards are essentially function whose return types is a type predicate. 
    //A type predicate takes the form of "parameterName is Type". So for example let's say we have the function below. 
        //pet is Fish is our type predicate where pet is the parameterName and Fish is the Type. This type predicate forces us to return a boolean value!
        //In our return, we use a type assertion to convert our pet to a Fish. Then, we check if the swim property is IN the pet parameter. This resolves to a boolean value
        
        //Anytime isFish is called with some variable, TypeScript will use it to NARROW the variable to that specific type if the original type is compatible

    function isFish(pet: Fish | Bird): pet is Fish {
        //return (pet as Fish).swim !== undefined
        return 'swim' in (pet as Fish) //this is the same as the above
    }

    function getSmallPet() {
        let res: Fish | Bird
        return Math.random() > 0.5 ? res as Fish : res as Bird
    }

    let pet = getSmallPet() //let pet: Fish | Bird

    if (isFish(pet)) {
        //as we can see, isFish is called with the variable pet. Here, because of isFish, TypeScript knows that the pet IS a fish.
        pet.swim() //let pet: Fish
    } else {
        //Using control flow analysis, TypeScript ALSO sees that you don't have a fish, therefore you must have a Bird. 
        pet.fly() //let pet: Bird
    }

    //We can even use the isFish type guard to filter an array of Fish | Bird and obtain an array of Fish
    const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet(), getSmallPet(), getSmallPet()]
    const underwater1: Fish[] = zoo.filter(isFish)
    const underwater2: Fish[] = zoo.filter(isFish) as Fish[] //why do a type assertion?
    
    //the below is a more complex example. Adding the type predicate to the call back function ensures we return a boolean value after each iteration. It also lets us strictly type our variable to a Fish[]. Without it, TS is not able to narrow to a Fish[] return value. Note the type guard doesn't ensure pet is a Fish, pet can still be a Fish | Bird. What it does do is ensure that we are checking that the pet is a Fish and returning TRUE when the pet is a Fish. This signals to TS that hey, they're doing this so they MUST be returning a Fish[]
    const underwater3: Fish[] = zoo.filter((pet): pet is Fish => {
        if (pet.name === 'sharkey') return false
        return isFish(pet)
    })

    //classes can also use "this is Type" to narrow their type.

//Discriminated Unions
    //Discriminated Unions are where the TYPES (Circle, Square) in a union contain a COMMON property (kind: "circle" or kind: "square") with literal types. With discriminated unions, TS is able to narrow out the members of the union. 
    //Here we use more complex structures to narrow variables

    interface badShape {
        kind: "circle" | "square" //the kind field is a special field which tells us which shape we're dealing with.
        radius?: number //if it's a circle then we'll use radius, and if it's a square the sideLength
        sideLength?: number
    }

    //note this approach can create problems because the radius and sideLength properties are optional! For instance even if the kind property is "circle", TypeScript still doesn't know if radius will be there! A better approach is to define separate interfaces for circle and square

    interface Circle {
        kind: "circle"
        radius: number
    }

    interface Square {
        kind: "square",
        sideLength: number
    }

    type Shape = Square | Circle

    function getArea(shape: Shape) {
        if (shape.kind === "circle") { //here kind is the discriminant property of Shape. By checking whether the kind property was a circle, we were able to get rid of every type in Shape that did not have a kind property with the type "circle"
            return Math.PI * shape.radius ** 2
        }
    }

    //The important thing here was encoding the Shape. Communicating that Square and Circle were two separate types with 'kind' fields was crucial! 

//Exhaustiveness Checking
    //When narrowing, you can reduce the options of a union to a point where you have removed all possibilities. In this case, TypeScript uses the never type to represent a state which should not exist. 
    // The never type is assignable to every type; however, no type is assignable to never (except never itself). This means you can use narrowing and rely on never turning up to do exhaustive checking in a switch statement.
