export interface signUp{
    name: string,
    email: string,
    password: string
}
export interface loginUp{
    email: string,
    password: string
}
export interface product{
    name: string,
    price: number,
    category: string,
    color: string,
    description: string,
    image: string
    id:number;
}