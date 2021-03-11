import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { company } from '../services/company.model'
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyDataService {

  companies: company[] = []; 

  currentDay: number = 1; 

  currentCompany: company = this.companies[0]; 

  constructor(private firestore: AngularFirestore, private userDataService: UserDataService) {
    this.subscribeToCompanies(); 
  }

  subscribeToCompanies () {
    this.firestore.collection("companies", ref => ref.where('currentPrice', '>', -1))
      .valueChanges()
      .subscribe((query: company[]) => {
        this.companies = query;
        console.log("Companies: ", this.companies);
        //this.userDataService.updateUserPortfolioChart(this.companies);  
      });
  } // subscribeToCompanies



}
