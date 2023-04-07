//Union Types
    //union types are a means to combine types. These types are formed from two or more other types. The types within a union type are called union members

    function printId(id: number | string | object) {
        console.log(`Your ID is: ${id}`)
    }

    printId(23)
    printId("string")
    printId({id: 23})

    //It's important to note that TypeScript only lets you use methods that are available to all union members. 

    function printId2(ids: number[] | object) {
        //console.log(ids.map(id => {}) => property map does not exist on type object
    }

    //To solve the above, we can 'narrow' the code. Narrowing occurs when TypeScript can deduce a more specific type for a value based on the structure of the code
    
    function printId3(id: number | string) {
        if (typeof id === "string") {
            console.log(id.toUpperCase())
        } else {
            console.log(id)
        }
    }

    //the below is called a union type
        type Style2 = 'bold' | 'italic' | 23;
        let font2: Style2 = 'bold'

        //font = 'something' => notice how now, font is only assignable to either bold, italic, or 23

//more often though, you’ll be strongly typing objects with multiple properties with different types
//Most importantly, Unions are composed using the intersection of its types' properties. Given two sets of properties, only the intersection of their properties applies to the union.
