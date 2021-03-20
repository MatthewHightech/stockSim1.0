import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { CompanyDataService } from '../services/company-data.service';
import { UserDataService } from '../services/user-data.service';
import { user } from '../services/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  page: string = "home"; 

  constructor(public authService: AuthService, public userService: UserDataService, public companyService: CompanyDataService) {} // constructor

  ngOnInit() {
  }

  changePage(page: string) {
    this.page = page; 
  }

  changeDay(type: string) {
    this.userService.updateUserPortfolioChart(this.companyService.companies); 
    if (type == 'add' && this.userService.user.day < 5) {
      this.userService.user.day++; 
    } else if (type == 'subtract' && this.userService.user.day > 1) {
      this.userService.user.day--;
    }
    this.userService.updateDay(); 
  }

}
