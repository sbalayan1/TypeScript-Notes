//TypeAliases
    //A type alias essentially let's us instantiate a type that we can reuse for typing our functions, variables, etc. Note we cannot monkeypatch primitive types. 
    //Type aliases are a way to NAME an object type
    //Note a TYPE cannot be reopened to add new properties

    //Type aliases may not participate in declaration merging but interfaces can

type Point = {
    x: number
    y: number
}

function sumPoints(pt: Point): number {
    return pt.x + pt.y
}

console.log(sumPoints({x: 20, y: 5})) //=> 25
//console.log(sumPoints({x: 20, y: "string"})) //breaks because y must be a number

function sumMultiplePoints(pt1: Point, pt2: Point): Point {
    const res: Point = {x: 0, y: 0}
    Object.keys(pt1).forEach(key => {
        res[key] = pt1[key] + pt2[key]
    })

    return res


    //the below hardcodes the return value. The above does the same but utilizes a loop and a new obj

    return {
        x: pt1.x + pt2.x, 
        y: pt1.y + pt2.y}
}


//We can even use type aliasing to create reusable combinations of types or reusable UNION TYPES. For example

function sumUnionTypesHard(x: number | string, y: number | string): number | string {
    if (typeof x === 'number' && typeof y === 'number') return x + y
    if (typeof x === 'string' && typeof y === 'string') return x + y
}


type ID = string | number
function sumUnionTypes(x: ID, y:ID): ID {
    if (typeof x === 'number' && typeof y === 'number') return x + y
    if (typeof x === 'string' && typeof y === 'string') return x + y
    //if (typeof x === typeof y) return x + y //why doesn't this work? typeof x resolves to ID, not string or number. 
}

//extending a type via intersections

type Animal = {
    name: string
}

type Bear = Animal & {
    honey: boolean
}

function getBear(): Bear {
    const res: Bear = {
        name: "I hate honey bear",
        honey: false
    }

    return res
}

const bear = getBear()
bear.name
bear.honey



//OTHER NOTES
    //Type Assertions
        //Use type assertions to convert types to more specific or less specific versions of themselves. 
        //For instance, in the below, TypeScript only knows that document.getElementById will return an HTMLElement. However, YOU know that we are specifically grabbing an HTMLCanvasElement. In this case, we can use a type assertion to specify a more specify type. 

        const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement //=> myCanvas: HTMLCanvasElement
        const alternateMyCanvas = <HTMLCanvasElement>document.getElementById('main_canvas') //this is called angle-bracket syntax

        //the below uses two type assertions
        type T = number
        const expr = "2"
        const a = (expr as any) as T //=> a: number. This is weird. why does this work?
        //note type assertions are removed at compile time. There will be no runtime checking for the type assertion. 
