//from my view, generics are like type parameters. They let users pass types as arguments into functions and the variables will be typed to those arguments

//generics are a way of capturing the type of the argument in a way that we can use it to denote what is being returned


//The below adds a type variable Type to the function. This type variable lets us capture the Type the user provides to the function so we can use it later. The same Type is again used as the return type, which ultimately lets us traffic that type information in and out of the function. 
function identity<Type>(arg: Type): Type {
    return arg
}

// Without this, we would lose information about what type is returned. The below is an example of this problem.
function brokenIdentity(arg: any): any {
    return arg
}

brokenIdentity(2) //=> The only information we can infer is that any is returned from the function. 
identity<number>(2) //=> here we call the identity method and set the type variable Type to a number and pass 2. With this we are able to infer that a number is returned from the function. 
identity<string>("myString") //=> this line showcases how the type variable Type acts like a type parameter. Here we are able to set Type to a string and pass "myString". We are able to infer that identity returns a string. 

//note the below doesn't work because the type we set Type to is not the same as the argument passed in.
// identity<string>(2)

//An even better way to do the above is through type argument inference. The below tells the compiler to set the value of Type for us automatically based on the argument that is passed in
const output = identity(false)//const output: false or const output: boolean


//We can even create arrays of Types and use these types in our functions. The below adds a type variable called Type to the identities function. We say that our args parameter should be an Array of Types and the function should return an array of Types
function identities<Type>(args: Type[]): Type {
    //notice that if your return value is a Type, we can't return args ebcause it's an array of args
    //return args -> TypeError
    return args[0] //however we can return a single element within the array because that is an instance of the Type class
}

//const output2 = identities<string>([1])//TypeError: number is not assignable to string
const output2 = identities<string>([]) //why does this work? the args is not an array of strings
const output3 = identities<number>([1,2,3])

//the below is an example of the above however we use the Array class instead of the array literal
function alternateIdentities<Type>(args: Array<Type>): Array<Type> {
    return args
}


//Generic Types
    //The below explores the type of the functions themselves and hwo to create generic interfaces. 
    //Here we write the generic type as a call signature of an object literal type

    function genericIdentity1<Type>(args: Type): Type {
        return args
    }

    //the below uses a different name for the generic TYPE parameter. 
    const myIdentity1: <Input>(arg: Input) => Input = genericIdentity1

    myIdentity1("string")
    //Here we write the generic type as a call signature of an object literal type.
        //Object Literal Type = { <Type>(arg: Type): Type }
    const myIdentity2: { <Type>(arg: Type): Type } = genericIdentity1

    //Now we can extract the Object literal typoe and move it into an interface
    interface GenericIdentityFunc {
        <Type>(arg: Type): Type
    }

    function genericIdentity2<Type>(arg: Type): Type {
        return arg
    }

    const myIdentity3: GenericIdentityFunc = genericIdentity2 //the generic types of the interface and the function need to match. For instance, arg cannot be a Type[]. 
    myIdentity3("string")

    //The below makes the generic parameter a parameter of the whole interface. 
    interface GenericIdentityWideParam<Type> {
        (arg: Type) : Type
    }


    //This let's us see what types we're generic over and makes the type parameter visible to all the other members of the interface
    const myIdentity4: GenericIdentityWideParam<number> = genericIdentity2
    //myIdentity4("string") //notice this fails because the interface, GenericIdentityWideParam, is typed to a number.
    myIdentity4(5) 

    //Understanding when to put the Type parameter directly on the call signature and when to put it on the interface itself will be helpful in describing what aspects of a type are generic. 


//Generic Classes
    //A generic class has a similar shape to a generic interface. 
    class GenericNumber<NumType> {
        zeroValue: NumType
        // add(x: NumType, y: NumType) {
        //     return x + y //Notice this won't work because we are setting x and y to NumTypes. TypeScript tells us that NumType could be a string or a boolean or something else where we cannot use the '+' operator
        // }

        betterAdd: (x: NumType, y: NumType) => NumType //This way we're able to strictlyType x and y and say that betterAdd returns a NumType. Then, when we create a new instance of our GenericNumber, we can assign our betterAdd property to a function
    }

    const myGenericNumber = new GenericNumber<number>() //by passing a number to the NumType Parameter, we effectively say that within this instance of a GenericNumber, any property that is Typed to the NumType, must be a number. 
    //myGenericNumber.zeroValue = "string"//this fails because zeroValue is a NumType. NumType in this instance is a number. 

    const myGenericString = new GenericNumber<string>()
    myGenericString.zeroValue = "String"
    myGenericString.betterAdd = (x, y) => x + y
    console.log(myGenericString.betterAdd("a", "b")) //=> "ab"
    console.log(myGenericString.betterAdd(1,2)) //=> errs because numType in this instance should be a string. 

//Generic Constraints
    //Say for instance we want to work on a SET OF TYPES. Essentially we want to use Generic Types BUT we have a range of Types a function, interface, or even Class can be. Further we don't want ANY type to be passed into our generic type parameter. 
    //For example, the below wants to make use of the .length property of arg. The compiler however can't prove that every type of arg will ahve a .length property and throws an error

    function cantUseLength<Type>(arg: Type): Type {
        return arg.length 
    }

    //Instead of working with any and all types, we constrain our function to work with any and all types that ALSO have a .length property. To do so, we list this requirement (the type must have a .length property) as a CONSTRAINT on our TYPE parameter. To this, we'll create an interface that describes our constraint. Our TYPE parameter will then, EXTEND this interface and thus inherit the constraint

    interface Lengthwise {
        length: number
    }

    let arr: Lengthwise
    arr = [] //notice how this works because an arr has the length property
    //arr = 2 //notice how this doesn't work because a number doesn't have the length property. 
    arr = "string" //you'll also notice though that only the length property is available on the variable. It's not like the interface INHERITS the properties of what it's assigned to. So arr doesn't have access to pop and push just because it's assigned to an array. 


    //Knowing what we know from the above, we can extend the interface above and ensure our generic TYPE parameter has the length property

    function canUseLength<WeCanNameThisAnything extends Lengthwise>(arg: WeCanNameThisAnything): WeCanNameThisAnything {
        //arg.length
        return arg
    }

    const brokenVariable = canUseLength(2) //argument of type number is not assignable to parameter of type Lengthwise
    const fixedVariable = canUseLength([])
    const fixedVariable2 = canUseLength("string")