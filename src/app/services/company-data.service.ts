import { Injectable } from '@angular/core';
import { company } from '../services/company.model'

@Injectable({
  providedIn: 'root'
})
export class CompanyDataService {

  companies: company[] = [
    {
      name: "Horizon Drilling", 
      bio: "Horizon Drilling Bio", 
      currentPrice: 0, 
      prices: [45, 48, 56, 54, 60]
    }, 
    {
      name: "Katze Auto", 
      bio: "Katze Auto Company BIO", 
      currentPrice: 0, 
      prices: [8, 15, 3, 3, 4]
    }, 
    {
      name: "Watchdog", 
      bio: "Watchdog Company BIO", 
      currentPrice: 0, 
      prices: [65, 62, 69, 73, 76]
    }, 
    {
      name: "Guco", 
      bio: "Guco Company BIO", 
      currentPrice: 0, 
      prices: [3, 3.25, 3.25, 4, 4]
    }, 
    {
      name: "Grizzly Motors", 
      bio: "Grizzly Motors Company BIO", 
      currentPrice: 0, 
      prices: [78, 74, 82, 80, 81]
    }, 
    {
      name: "Wild Rose Farms", 
      bio: "Wild Rose Farms Company BIO", 
      currentPrice: 0, 
      prices: [46, 52, 46, 46, 47.5]
    }, 
    {
      name: "Fairchild’s", 
      bio: "Fairchild’s Company BIO", 
      currentPrice: 0, 
      prices: [32, 35, 35.15, 32.5, 31]
    }
  ]; 

  currentDay: number = 1; 

  currentCompany: company = this.companies[0]; 

  constructor() {}


}
