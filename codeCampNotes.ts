// Types:
//     number
//     string
//     boolean
//     null
//     undefined
//     void
//     object
//     array
//     tuples
//     any
//     never
//     unknown
//     union


//number
    let userId: number = 3334466 //annotates that this userId is a number and should always be a number
    //an advantage here is that userId. will only show all available js methods for the Number class. 
    let userId2: number = 334.5 //even with floats, typescript will infer it as a number
    let isLoggedIn: boolean = false

    //you can even do:
    let userId3: number
    userId3 = 0.1234

//TypeScript is able to infer types when you immediately assign values. We should use type inference when we can instead of explicitly assiging types
    let userId4 = 123456 
    //userId4 = "string" //notice, ts infers userId4's number type and throws an error when trying to change userId4 to an incorrect type

//functions
function addTwo(num: number): number {
    return num + 2
}

addTwo(2)

function getUpper(val: string): string {
    return val.toUpperCase()
}

getUpper('5')

//the below is an example of creating functions with typed parameters with default values
let loginUser = (name: string, email: string, isPaid: boolean = true) => {}
// let failedLoginUser = (name: string, email: string, isPaid: boolean = 123) => {} //this breaks because the default value is not a boolean

//the below explicitly says that the function can return a boolean or a string
    // function getValue(myVal: number): boolean | string {
    //     if (myVal > 5) {
    //         return true
    //     }

    //     return "200 OK"
    // }

const getHello = (s: string):string => {
    return s
}

//in the below, TypeScript is able to infer that hero is a string because the heros is a string[]. Further we type our return value to a string
const heros = ['thor', 'spiderman', 'ironman']
heros.map((hero): string  => {
    return `hero is ${hero}`
}) 

//don't implicitly infer a void return type. make sure to explicitly return the void type
function consoleError(error: string): void {
    console.log(error)
}

//some functions NEVER return a value. It's not void. This is typically used for throwing error messages
//note (from documentation) the never type represents values which are never observed. In a return type, this means that the function throws an exception or terminates execution of the program. 
//never also appears when TypeScript determines there's nothing left in a union. 
function handleError(error: string): never {
    throw new Error(error)
}

//Objects
const User = {
    name: "Hitesh",
    emai: "hitesh@lco.dev",
    isActive: true
}

function createUser({name: string, isPaid: boolean}) {}
//createUser() //typescript stops us from doing this
//createUser({}) //typescript stops us from doing this
createUser({name: "hitesh", isPaid:false})

export {}

