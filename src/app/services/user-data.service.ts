import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ArgumentOutOfRangeError, Observable, Subject } from 'rxjs';
import { stock } from './stock.model';
import { user } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  user: user = {
    username: "", 
    classCode: "", 
    budget: 0, 
    portfolio: []
  }

  authState; 

  constructor(private firestore: AngularFirestore, public router: Router, private auth: AngularFireAuth) {
    this.subscribeToAuthState(); 
  }

  isAuthenticated(): boolean {
    return this.authState !== null;
  }

  currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : null;
  }

  subscribeToAuthState() {
    this.auth.authState.subscribe( authState => {
      this.authState = authState;
      console.log(this.authState);
      if (this.isAuthenticated()) {
        this.subscribeToDB();
      }
    });
  } // sub to auth

  subscribeToDB() {
    if (this.isAuthenticated()) {
      this.firestore.collection('users').doc<user>(this.currentUserId())
      .valueChanges()
      .subscribe((ref) => {
        this.user = ref;
        console.log(this.user); 
      });

      this.router.navigate(['/', 'dashboard']);
    } else {
      this.router.navigate(['/', 'sign-up-login']);
    }  
  } // subscribeToDb

  stockTransaction(type: string, total: number, company: string, numberOfStocks: number, stockPrice: number) {
    this.firestore.collection('transactions').add({
      userUid: this.currentUserId(), 
      date: new Date(),
      total: total, 
      type: type,
      company: company, 
      numOfStocks: numberOfStocks,
      stockPrice: stockPrice
    });

    if (type == 'Buy') { 
      let newStock: stock = {
        company: company, 
        numberOfStocks: numberOfStocks, 
        valueOfEachStock: stockPrice
      }
      
      this.user.portfolio.push(newStock);
      this.user.budget -= total;
      console.log("current budget: " + this.user.budget)  
      // remove funds from users budget
      // add stocks to user's portfolio
      this.firestore.collection('users').doc<user>(this.currentUserId()).update({
        budget: this.user.budget, 
        portfolio: this.user.portfolio
      }); 

    } else {

    }
  } // stockTransaction

} // CLASS
