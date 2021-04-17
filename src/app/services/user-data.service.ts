import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ArgumentOutOfRangeError, Observable, Subject, Subscription } from 'rxjs';
import { stock } from './stock.model';
import { transaction } from './transaction.model';
import { user } from './user.model';

import { ChartDataSets } from 'chart.js';
import { timeStamp } from 'console';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  user: user = {
    username: "", 
    startDate: "", 
    budget: 0, 
    portfolio: [],
    day: 1
  }

  transactions: transaction[] = []; 

  authState; 

  userSubscription: Subscription = null;
  transactionSubscription: Subscription = null;
  classroomSubscription: Subscription = null;

  currentPortfolioData: ChartDataSets[] = []; 


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
        ref.startDate = ref.startDate.toDate()
        this.user = ref;
        this.user.day = this.setUserDay()
      });
      // subscribe to users transactions
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

  setUserDay() {
    let daysPassed
    let currentDay = new Date(Date.now()).getDate()

    if (this.user.startDate.getDate() > currentDay) {
      daysPassed = currentDay + (this.getDaysInMonth(this.user.startDate.getMonth()) - this.user.startDate.getDate()) + 1;
    } else {
      daysPassed = currentDay - this.user.startDate.getDate() + 1
    }
    return daysPassed
  }

  getDaysInMonth(month) {
    return new Date(2021, month+1, 0).getDate();
  }

  canTrade() {
    return (new Date(Date.now()).getHours()) > 9 && (new Date(Date.now()).getHours()) < 17 
  }

  stockTransaction(type: string, total: number, company: string, numberOfStocks: number, stockPrice: number) {
    this.firestore.collection('transactions').add({
      userUid: this.currentUserId(), 
      date: this.user.day,
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

  countUserStocks(name: string): number {
    let numStocks = 0; 
    this.user.portfolio.forEach(element => {
      if (element.company == name) {
        numStocks += element.numberOfStocks; 
      }
    });
    return numStocks; 
  }

  // get's called when one of the company prices is changed and updates the graph on the users portfolio
  // *companies = companyservice.companies
  updateUserPortfolioChart(companies) {
    console.log("Companies", companies); 

    this.currentPortfolioData = []; 
    let coordinates = []; 
    for (let i = 0; i < 5; i++) {
      if (i < this.user.day) {
        let y = this.user.budget + this.totalPortfolio(i, companies); 
        coordinates.push({
          x: i, 
          y: y
        }); 

        this.currentPortfolioData.push({
          data: coordinates, 
          label: "Portfolio Graph", 
          pointRadius: 1
        }); 

        console.log("Portfolio Graph Data: ", this.currentPortfolioData); 
      }// if
    } // for
  } // updateUserPortfolioChart

  updateUserPortfolioChartV2(companies) {
    this.currentPortfolioData = []; 
    let coordinates = []; 
    let y = 100000;  
    for (let i = 0; i < 5; i++) {
      if (i < this.user.day) {
        let numOfTransactionsOnDay = 0; 
        this.transactions.forEach(element => {
          if (element.date-1 == i) {
            y += element.total; 
            console.log(`y: ${y} -- Element Total: ${element.total}`); 
          }
          
        });

        coordinates.push({
          x: i, 
          y: y
        }); 

        this.currentPortfolioData.push({
          data: coordinates, 
          label: "Portfolio Graph", 
          pointRadius: 1
        }); 
      }
    }
  }

  updateDay() {
    this.firestore.collection('users').doc<user>(this.currentUserId()).update({
      day: this.user.day
    }); 
  }

  // helper function that returns users total portfolio on that current day
  // * i = the day the total is checking for
  // * companies = the companies the user owns stocks for
  totalPortfolio(i, companies) {
    let totalPortfolio = 0;
    this.user.portfolio.forEach(element => {
      totalPortfolio += (element.numberOfStocks*this.priceOnDay(element.company, i, companies)); 
    });
    return totalPortfolio
  }

  // Helper function for "updateUserPortfolioChart" and returns the price of a stock on a specifyed day
  priceOnDay(company: string, day: number, companies): number {
    let returnValue; 
    companies.forEach(element => {
      if (element.name == company) {
        returnValue = element.prices[day]; 
      }
    });
    return returnValue; 
  }

  signOutReset() {

    this.userSubscription.unsubscribe(); 
    this.transactionSubscription.unsubscribe(); 
  }

  userDataReset() {
    this.firestore.collection('users').doc<user>(this.currentUserId()).update({
      budget: 100000, 
      portfolio: [], 
      day: 1, 
      startDate: new Date(Date.now())
    }); 
    this.firestore.collection("transactions", ref => ref.where('userUid', '==', this.currentUserId()))
    .get().toPromise().then((res) => {
      res.forEach(element => {
        this.firestore.collection('transactions').doc(element.id).delete(); 
      })
    })
  }

} // CLASS

