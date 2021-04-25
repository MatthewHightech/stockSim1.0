import { Timestamp } from "rxjs";
import { stock } from "./stock.model";

export interface user {
    username: string,
    startDate: any,
    budget: number, 
    portfolio: stock[], 
    day: number
}
