import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { user } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {



  constructor(private firestore: AngularFirestore, private authService: AuthService) {
  }


  getUser(): Observable<user> {
     return this.firestore.collection('users').doc<user>(this.authService.currentUserId()).valueChanges(); 
  }



}
