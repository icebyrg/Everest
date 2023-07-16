export type FirstItem<T extends any[]> = T[0]
type A = FirstItem<[string, number, boolean]>
type B = FirstItem<['B', 'F', 'E']>
type C = FirstItem<[]>
