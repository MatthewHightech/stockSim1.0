import { stock } from "./stock.model";

export interface user {
    username: string,
    classCode: string,
    budget: number, 
    portfolio: stock[]
}