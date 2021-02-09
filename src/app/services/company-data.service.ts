import { Injectable } from '@angular/core';
import { company } from '../services/company.model'

@Injectable({
  providedIn: 'root'
})
export class CompanyDataService {

  companies: company[] = [
    {
      name: "Oil", 
      bio: "Oil Company BIO", 
      currentPrice: 20
    }, 
    {
      name: "Car 1", 
      bio: "Car 1 Company BIO", 
      currentPrice: 140
    }, 
    {
      name: "Car 2", 
      bio: "Car 2 Company BIO", 
      currentPrice: 70
    }
  ]; 

  currentCompany: company = this.companies[0]; 

  constructor() {}


}
