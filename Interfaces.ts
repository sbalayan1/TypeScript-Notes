//Interfaces
    //an interface is another way to name an object type
    //interfaces can be reopened to add new properties and are always extendable. 
    //note if you have two interfaces or types with the same name in the same or another file, TS will recognize this and throw an errors. That's why we create an interface called Animal2 instead of just Animal

    //interfaces may only be used to decalre the shapes of objects, not rename primitives


    interface Animal2 {
    name: string
}

interface Bear2 extends Animal2 {
    honey: boolean
}

function getBear2(): Bear2 {
    // const brokenRes: Bear2 = {
    //     name: "honey bear",
    //     honey: true
    // }

    //note we don't need to explicitly type res because TypeScript infers the type based on our expressed return type above. If we don't return a value that is a Bear2 type, TypeScript throws property missing error
    const res = {
        name: "honey bear",
        honey: true,
        sexy: true
    }

    return res
}

const bear2: Bear2 = getBear2()
bear2.name //=> 'honey bear'
bear2.honey //=> true

//the below adds a new field to the Bear2 interface. notice that since we've added a new field to the Bear2 interface, our res variable errs because we are missing a property.
interface Bear2 {
    sexy: boolean
}


interface Chicken {
    kind: "chicken"
    meat: "chicken"
}

interface Beef {
    kind: "beef"
    meat: "beef"
}

interface Pork {
    kind: "pork"
    meat: "pork"
}


interface Soup {
    salt: boolean
    pepper: boolean
    chunky: boolean
    method: "boil"
    protein: Chicken | Beef | Pork
}

interface Stew extends Soup {
    chunky: true
    
}

interface Chili extends Stew {
    fishSauce: boolean
    beans: true
}

class JacobChili implements Chili {
    fishSauce: boolean;
    salt: boolean;
    pepper: boolean;
    beans: true
    chunky: true
    method: "boil"
    protein: Chicken | Beef | Pork

    
    constructor(fishSauce: boolean, salt: boolean, pepper: boolean, protein: Chicken | Beef | Pork){
        this.fishSauce = fishSauce
        this.salt = salt
        this.pepper = pepper
        this.beans = true
        this.chunky = true
        this.protein = protein
    }

    whatAmIEating() {
        return this.protein.kind
    }
}

const cow: Beef = {kind: "beef", meat: "beef"}
const myChili = new JacobChili(true, true, true, cow)

