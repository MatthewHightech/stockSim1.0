import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ArgumentOutOfRangeError, Observable, Subject, Subscription } from 'rxjs';
import { stock } from './stock.model';
import { transaction } from './transaction.model';
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

  transactions: transaction[] = []; 

  authState; 

  userSubscription: Subscription = null;
  transactionSubscription: Subscription = null;


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
      // subscribes to user data
      this.userSubscription = this.firestore.collection('users').doc<user>(this.currentUserId())
      .valueChanges()
      .subscribe((ref) => {
        this.user = ref;
        console.log(this.user); 
      });

      this.transactionSubscription = this.firestore.collection("transactions", ref => ref.where('userUid', '==', this.currentUserId()))
      .valueChanges()
      .subscribe((query: transaction[]) => {
        this.transactions = query;
        console.log("Transactions: ", this.transactions); 
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

    let newStock: stock = {
      company: company, 
      numberOfStocks: numberOfStocks, 
      valueOfEachStock: stockPrice
    }

    if (type == 'Buy') { 
      
      this.user.portfolio.push(newStock);
      this.user.budget -= total;
      console.log("current budget(buy): " + this.user.budget)  
      // remove funds from users budget
      // add stocks to user's portfolio
      this.firestore.collection('users').doc<user>(this.currentUserId()).update({
        budget: this.user.budget, 
        portfolio: this.user.portfolio
      }); 

    } else {
      let indexesToSplice = []; 
      for (let i = 0; i < this.user.portfolio.length; i++) {
        if (this.user.portfolio[i].company == company) {
          if (this.user.portfolio[i].numberOfStocks == numberOfStocks) {
            indexesToSplice.push(i);  
            break; 
          } else if (this.user.portfolio[i].numberOfStocks > numberOfStocks) {
            this.user.portfolio[i].numberOfStocks -= numberOfStocks;
            break;  
          } else {
            numberOfStocks -= this.user.portfolio[i].numberOfStocks; 
            indexesToSplice.push(i);  
          }
        }
      }

      indexesToSplice.forEach(element => {
        console.log("spliced" + element)
        this.user.portfolio.splice(element, 1); 
      });
      this.user.budget -= total;
      console.log("current budget(sell): " + this.user.budget)  
      // removes stocks to user's portfolio
      this.firestore.collection('users').doc<user>(this.currentUserId()).update({
        budget: this.user.budget, 
        portfolio: this.user.portfolio
      }); 
    }
  } // stockTransaction

  signOutReset() {

    this.userSubscription.unsubscribe(); 
    this.transactionSubscription.unsubscribe(); 
  }

  userDataReset() {
    this.firestore.collection('users').doc<user>(this.currentUserId()).update({
      budget: 100000, 
      portfolio: []
    }); 
  }

} // CLASS
