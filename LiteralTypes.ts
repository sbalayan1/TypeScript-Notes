//Literal Types

    //Aside from primitive types, we can actually pass ACTUAL strings, numbers, booleans as types in the types positions.
    //example:
    let dog: "Dog"
    //dog = "not a dog" //this errs because the variable dog is NOT a "Dog"
    dog = "Dog" //this works because the variable dog IS a "Dog"

    //Another interesting piece is that TypeScript treats let & var variables different from const variables. 
    let cat = "Cat" //=> cat: string, which means the cat variable can be ANY possible string
    const arthurCat = "Arthur" //=> arthurCat: "Arthur", Why? Since arthurCat is instantiated using const, arthurCat can ONLY represent 1 possible string. This is called LITERAL TYPE REPRESENTATION because the variable's TYPE is represented literally! 

    const theoCat: string = "Theo" //=> theoCat: string, here we overwrite the literal type representation of "Theo" and assign a string type to theoCat. This doesn't prevent the typical behavior of const.
    //theoCat = "another cat named Theoddore"

    //How can we leverage literal types? Well, what if we wanted to create a function that ONLY ACCEPTED SPECIFIC VALUES? The function called printText below uses literal types and unions to only accept 'left', 'right', and 'center' literal types as arguments 

    function printText(s: string, align: 'left' | 'right' | 'center'| number) {
        console.log(s, align)
    }

    printText('hello world', 'left') //=> prints(hello world, left)
    printText('goodbye', 2)
    printText('dang mama', 'random string') // argument of type 'random string' is not assignable to parameter of type 'left' | 'right' | 'center'| number
    printText('hi budy', false)// argument of type 'false' is not assignable to parameter of type 'left' | 'right' | 'center'| number

    //numeric literal types work the same way

    function compare(a: string, b: string): -1 | 0 | 1 {
        return a === b ? 0 : a > b ? 1 : -1
    }

    //NOTE THE ONLY LITERAL TYPES ARE BOOLEANS, NUMBERS, AND STRINGS


//Literal Inference
    //TypeScript assumes that the properties of an object might change later. 
    //In the code below, TypeScript doesn't throw an error because obj.counter must have the type number. Therefore we are correct in reassigning obj.counter to another number

    const obj = {counter: 0}
    if (true) {
        obj.counter = 1
    }

    //That being said, this 'literal inference' can cause issues
    const req = { url: "http://example.com", method: "GET"} //=> req: {urL: string, method: string}, here TypeScript infers that url and method are strings. 

    //Now imagine we have the below function. The method parameter uses a combination of literal typing and union typing. If you hover over the method parameter, you'll see method: 'POST' | 'GET'

    function handleRequest(url: string, method: 'POST' | 'GET') {
        fetch(url, {
            method: method
        })
    }

    //We can see that when we call handleRequest and pass the req obj, we run into errors! The error is, "Argument of type string is not assignable to parameter of type 'GET' | 'POST'"
    handleRequest(req.url, req.method)

    //req.method's type is inferred as STRING, not POST OR GET, even though we are technically using literal typing! THIS IS BECAUSE TYPESCRIPT ASSUMES REQ.METHOD MIGHT CHANGE LATER
    //To bypass this, we can do 2 things!
        //1) add a type assertion to either the object or to the argument passed in the function call
            
            const req2 = {url: "http://example.com", method: "GET" as "GET"}
            handleRequest(req2.url, req2.method)

            handleRequest(req.url, req.method as "GET")

        //2) Use 'as const' to convert the entire object into type literals
            const req3 = {url: 'http://example.com', method: "GET"} as const
            handleRequest(req3.url, req3.method)