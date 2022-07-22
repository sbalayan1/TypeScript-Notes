//Object Types
    //any JavaScript value with properties
    function printCord(pt: {x: number; y: number;}): void {
        console.log(`The coordinate's x value is ${pt.x}`)
        console.log(`The coordinate's x value is ${pt.y}`)
    }

    //here we define an object type with properties x and y, both number types. 

    //optional properties => add ? after a property name to make it optional 

        interface Person {
            first: string;
            last: string;
            dob?: Date;
        }


        let personOptional: Person = {
            first: "Sean",
            last: "John"
        }

        //note that JavaScript returns undefined when you access properties that don't exist. When you read from optional properties, you have to check for undefined before using it. 

        console.log("personOptional", personOptional.dob?.getDate)

        //another example
        function printName(obj: {first: string, last?: string}) {
            //console.log(obj.last.toUpperCase()) => could crash if obj.last is not provided. notice how we get obj.last is possibly undefined.


        }

        printName({first:"sean"}) //notice this doesn't throw an error. 

        //solution to the above
        function printName2(obj: {first: string, last?:string}) {
            console.log(obj.last?.toUpperCase())
        }

        printName2({first:"sean"})