export type Category="beach"|"mountain"|"city"|"countryside";
export interface Listing{
    id:number;
    title:string;
    location:string;
    category:Category;
    price:number;
    img:string;
    rating:number;
    superhost:boolean;
    available:boolean;
    availableFrom:string
}