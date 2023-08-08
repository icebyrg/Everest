type GetFirstName<S extends string> = S extends `${infer L} ${string} ` ? L : any

type FirstName = GetFirstName<'sajhd jhjkhjk'>

export { };
