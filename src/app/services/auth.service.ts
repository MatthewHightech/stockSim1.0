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
  SignUp(username, email, password, popup) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        console.log("1", this.firestore); 
        // save user doc in users collection in firestore
        await this.firestore.collection('users').doc(result.user.uid).set({
          username: username 
        }); 
        popup.dismiss().then(() => { popup = null; }); 
      }).catch((error) => {
        window.alert(error.message)
      });
  } // signup

  // Sign in with email/password
  Login(email, password, popup) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        // navigate to dashboard
         this.router.navigate(['/','sign-up-login', 'dashboard']);
         // close popup
         popup.dismiss().then(() => { popup = null; }); 
      }).catch((error) => {
        window.alert(error.message)
      })
  } // login

  async dbTest() {
    /*
    console.log("adding data"); 
    try {
      //await this.firestore.collection('users').doc('123').set({username: 'bob'});
     this.usersCollection.add({username: 'bob'}).then((result) => {
      console.log("add result: ", result); 
     }) 
      console.log("data added"); 
    } catch (err) {
      console.log(err);
    }
*/
/*
    console.log("test running")
    this.firestore.collection('cities').add({
      name: "Tokyo",
      country: "Japan"
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

    console.log('test running')
    this.firestore
      .collection("users")
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
          console.log("data: " + doc.data());
        });
      });
      */

      let fire = this.firestore;
      let collection = fire.collection('users'); 
      let get = collection.doc('123').ref.get()
        .then(function(docRef) {
          if (docRef.exists) {
            console.log("Document written with ID: ", docRef.id);
          } else {
            console.log("doesn't exist")
          }
          
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      

  } // auth service class

}

