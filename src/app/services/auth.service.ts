import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

interface user {
  username: string; 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) {
    } // constructor

  usersCollection: AngularFirestoreCollection<user> = this.firestore.collection('users'); 

  // Sign up with email/password
  SignUp(username, email, password, classCode, popup) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        console.log("1", this.firestore); 
        // save user doc in users collection in firestore
        await this.firestore.collection('users').doc(result.user.uid).set({
          username: username 
        }); 
        await this.firestore.collection('classrooms').doc(classCode).collection('students').doc(result.user.uid).set({
          username: username
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
        window.alert(error.message)
      })
  } // login

} // auth service class

