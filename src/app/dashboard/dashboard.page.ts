import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(public authService: AuthService, public userService: UserDataService) {
    this.userService.getUser().subscribe((ref) => {
      this.user = ref;
      console.log(this.user); 
    })
  }


  ngOnInit() {

  }

}
