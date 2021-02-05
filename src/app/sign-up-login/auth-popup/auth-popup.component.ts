import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-popup',
  templateUrl: './auth-popup.component.html',
  styleUrls: ['./auth-popup.component.scss'],
})
export class AuthPopupComponent implements OnInit {

  @Input() popover; 
  @Input() type: string;

  username: string; 
  email: string;
  password: string;
  confirmPassword: string; 
  classcode: string; 

  constructor(public auth: AuthService,) { }

  ngOnInit() {}

}
