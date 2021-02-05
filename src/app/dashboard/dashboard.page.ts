import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { UserDataService } from '../services/user-data.service';
import { user } from '../services/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: user = {
    username: "", 
    classCode: ""
  }; 

  constructor(public authService: AuthService, public userService: UserDataService, public router: Router) {
    if (this.authService.isAuthenticated()) {
      this.userService.getUser().subscribe((ref) => {
        this.user = ref;
        console.log(this.user); 
      });
    } else {
      this.router.navigate(['/', 'sign-up-login']);
    }
  } // constructor


  ngOnInit() {

  }

}
