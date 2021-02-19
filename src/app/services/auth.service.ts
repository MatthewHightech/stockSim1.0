import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) {
    } // constructor

  // Sign up with email/password
  SignUp(username, email, password, classCode, popup) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        // save user doc in users collection in firestore
        await this.firestore.collection('users').doc(result.user.uid).set({
          username: username, 
          classroom: classCode, 
          budget: 100000, 
          portfolio: []
        }); 
        this.Login(email, password, popup); 
      }).catch((error) => {
        window.alert(error.message)
      });
  } // signup

  // Sign in with email/password
  Login(email, password, popup) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        // navigate to dashboard
         this.router.navigate(['/', 'dashboard']);
         // close popup
         popup.dismiss().then(() => { popup = null; }); 
      }).catch((error) => {
        console.log("loginFailed")
        window.alert(error.message)
      })
  } // login

  LogOut() {
    return this.auth.signOut().then(() => {
      this.router.navigate(['/', 'sign-up-login']);
    })
  }

} // auth service class

