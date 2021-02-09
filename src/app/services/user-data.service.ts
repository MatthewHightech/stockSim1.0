import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { user } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  user: user = {
    username: "", 
    classCode: ""
  }

  constructor(private firestore: AngularFirestore, private authService: AuthService, public router: Router) {}

  subscribeToDb() {
    if (this.authService.isAuthenticated()) {
      this.getUser().subscribe((ref) => {
        this.user = ref;
        console.log(this.user); 
      });
    } else {
      this.router.navigate(['/', 'sign-up-login']);
    }  
  } // subscribeToDb

  // returns user based on the signed in id as an observable *dashboard is subscribed to this*
  getUser(): Observable<user> {
     return this.firestore.collection('users').doc<user>(this.authService.currentUserId()).valueChanges(); 
  }

}
