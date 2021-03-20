import { stock } from "./stock.model";

export interface user {
    username: string,
    classroom: string,
    budget: number, 
    portfolio: stock[], 
    day: number
}
