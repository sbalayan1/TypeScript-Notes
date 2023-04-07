//TypeScript has a special syntax for removing null and undefined from a type without doing any explicit checking. Write ! after any expression to effectively use a type assertion that says, the value IS NOT null or undefined

//For example:
    function liveDangerously(x?: number | null) {
        //return x!.toFixed() //this syntax is better than the below. Here we use the nonnull assertion operator on x to create a type assertion that says x IS NOT null or undefined.
        if (x) {
            return x.toString()
        }
    }