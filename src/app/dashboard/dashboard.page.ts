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

  page: string = "home"; 

  constructor(public authService: AuthService, public userService: UserDataService) {} // constructor

  ngOnInit() {
  }

  changePage(page: string) {
    this.page = page; 
  }

}
