//Functions

//Function Type Expressions 
    //The simplest way to describe a function is with a function type expression

    //greeter is a function that takes a function as an argument. The callback function is a function with one parameter called a that is a string. It does not return anything. 
    function greeter(fn: (a: string) => void) {
        return fn("hello world")
    }

    //printToConsole is a function with one parameter, s, that is a string. It prints s
    function printToConsole(s: string) {
        console.log(s)
    }

    //here we invoke our greeter function. We pass the printToConsole function as an argument. fn, in greeter, becomes a placeholder for the printToConsole function. greeter runs and invokes printToConsole, and passes "hello world" as the parameter s.
    greeter(printToConsole)


    //Another way we can define the function type (a: string) => void, is with a type alias!
    //Again we say, functions of the GreetFunction type, MUST have a parameter that is a string and return nothing
    type GreetFunction = (a: string) => void
    function alternateGreeter(fn: GreetFunction) {
        return fn("hello world")
    }


    //the below is a refactor. we add another parameter so that we don't have to hardcode an input string and can pass different input strings
    type GreeterFunction = (a: string) => void
    function sayHello(fn: GreeterFunction, s: string) {
        fn(s)
    }

    function print(s: string) {
     console.log(s)
    }

    sayHello(print, "hey jacob")

    //the below utilizes generics on the GreetererFunction type alias
    type GreetererFunction = <Type>(a: Type) => void

    function showMeTheMoney<Type>(fn: GreetererFunction, s: Type) {
        return fn<Type>(s)
    }

    let printFn = <Type>(s: Type) => console.log(s)
    showMeTheMoney<number>(printFn, 5)
    showMeTheMoney<boolean>(printFn, true)
//Call Signatures
    //call signatures are essentially functions with object properties. They let us describe something that is callable that HAS properties. To do so, we use an Object Type.  

    //Below we use an Object Type to describe a call signature. essentially any function that is a DescribableFunction will have a single arg that is a number and returns a boolean value. The function will also have a property called description
    type DescribableFunction = {
        description: string ;
        (arg: number): boolean //synonymous to (arg: number) => boolean
        //since we are defining properties, we cannot do (arg: number) => boolean
    }

    function doSomething(fn: DescribableFunction) {
        return fn.description + " " + fn(5).toString()
    }

    //here we define a call signature function called myFunc and add the description property after. Notice, we don't run into any errors typing our function first, THEN assigning value to the description property. Note, we HAVE to assign some value to the description property.
    const myFunc: DescribableFunction = (arg: number) => arg > 5 ? true : false
    myFunc.description = "john cena was here and likes numbers greater than 5?"
    doSomething(myFunc) //=> "john cena was here and lieks numbers greater than 5? false"

    //note the function type expression syntax does not allow for declaring properties. See below
    type IndescribableFunction = (arg: string) => string
    const myOtherFunc: IndescribableFunction = (arg: string) => {return arg}
    //myOtherFunc.description = "hey this doesn't work"

//Construct Signatures
    //JavaScript functions can also be invoked with the new operator. TypeScript refers to these as 'constructs' becaust they usually create new objects. To write a construct signature, add the 'new' keyword in front of a call signature.
    //note call signatures and construct signatures can be used inside of the same type


    interface CallOrConstruct {
        new (arg: string): string //construct signature
        (arg: number): number //call signature
    }

    function someFunction(fn: CallOrConstruct) {
        const arg = Math.random() > 0.5 ? "5" : 5
        return typeof arg === "string" ? new fn(arg) : fn(arg) //invokes fn either as a construct or call signature depending on what type arg is
    }

//Generic Functions
    //generics are used when we want to describe correspondence between two values. With generic functions, we use a type parameter in the function signature
    function firstElement<Type>(arr: Type[]): Type {
        return arr[0]
    }

    const s = firstElement(["a", "b", "c"]) //s: string
    const n = firstElement([1, 2, 3]) //n: number

    //inference
        //the interesting thing here is that we didn't actually need to define the TYPE! we didn't need to say firstElement<number> for n. The type was inferred!!!
        //We can even use inference with multiple type parameters

        function map<Input, Output>(arr: Input[], fn: (arg: Input) => Output): Output[] {
            return arr.map(fn)
        }

        const myMapArr = map([1,2,3,4,5], (elem) => (elem + 1).toString()) //=> ['2','3','4','5','6']
        //Input: number
        //Output: string
        //arr: number[]
        //fn: (arg: number) => string

        //Here, TypeScript infers BOTH the types of Input and Output based on the return value of the callback function.
            //1) TypeScript infers the Input and Output of our callback function. First it sees that arr is a number[], so it knows that the arg in our callback is a number (elem: number). Then it infers our return value to be a string. 
            //2) Now that it knows we return strings, it is able to infer that the function returns a string[]

    //constraints
        //Use constraints in combination with Type parameters to limit the kinds of types that a type parameter can accept
        // interface Lengthwise2 {
        //     length: number
        // }

        function longest<Type extends Lengthwise>(a: Type, b: Type): Type {
            return a.length > b.length ? a : b
        }

        const longArr = longest([1,2,3], [4,5,6,7]) //TS infers longArray: number[]
        const longNum = longest(10, 20) //does not work because number types do not have a length property


        //Common error when working with constrained values
        function minimumLength<Type extends Lengthwise>(obj: Type, min: number): Type {
            if (obj.length > min) {
                return obj
            } else{
                return {
                    length: min
                }
            }
        }

        //Why is this problematic? Well it's problematic because we are returning a value that matches the TYPE but is not OF the same Type. We should in this case, return the same type from our function

//Specifying Type Arguments
    //TypeScript isn't always able to infer types! For example

    function combine<Type>(a: Type[], b: Type[], c:Type[]): Type[] {
        return a.concat(b,c)
    }

    const combinedArrs = combine(["a", "b", "c"], [1,2,3], [true, false, true]) //as you can see our second input says, "Type number is not assignable to type string". This is because Type's value in this case is set to string. The Type parameter assumes the type of the first argument passed in. SO in this case, it assumes a string!
    

    //To fix, we can use a union type in our Type Parameter
    const fixCombinedArrs = combine<string | number | boolean>(["a", "b", "c"], [1,2,3], [true, false, true]) 

//Overloads

//Rest Parameters
    //Rest params and arguments are a way to define functions that take an UNBOUNDED number of arguments. 
    //example of rest params in vanilla js
    function sum(...args) {
        let total = 0
        for (let i = 0; i<args.length; i++) {
            total += 1
        }
        return total
    }

    //note that args will be an array and the arguments passed in will be stored in this array. The args obj is not a real array but rather an Array instance.

//Other notes:
    //When possible, use the type parameter itself rather than constraining it.
    //Always use as few type parameters as possible
    //If a type paramter only appears in one location, strongly consider if you actually need it.
    //When writing a function type for a callback, never write an optional parameter unless you intend to call the function without passing that argument
    //Always prefer parameeters with union types instead of overloads when possible
    //void is not the same as undefined
    //object is not Object. Always use object....