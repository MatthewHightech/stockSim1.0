import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';
import { AuthPopupComponent } from './auth-popup/auth-popup.component'; 

@Component({
  selector: 'app-sign-up-login',
  templateUrl: './sign-up-login.page.html',
  styleUrls: ['./sign-up-login.page.scss'],
})
export class SignUpLoginPage implements OnInit {

  signUpPopup = null;
  loginPopup = null; 

  constructor(private router: Router, public auth: AuthService, public popoverController: PopoverController) {}

  ngOnInit() {
  }

  // async function to control the potential popups for the game. This includes a deathscreen, instructions, and checkpoints
  popover = async function presentPopover(type: string) { 
    if (type == "Sign Up") {
      this.signUpPopup = await this.popoverController.create({
        component: AuthPopupComponent,
        componentProps: {
          popover: this.signUpPopup, 
          type: "Sign Up"
        },  
        cssClass: 'my-custom-popup',
        translucent: true, 
        backdropDismiss: true
      });
      return await this.signUpPopup.present();
    } else if (type == "Login") {
      this.loginPopup = await this.popoverController.create({
        component: AuthPopupComponent,
        componentProps: {
          popover: this.loginPopup, 
          type: "Login"
        },  
        cssClass: 'my-custom-popup',
        translucent: true, 
        backdropDismiss: true
      });
      return await this.loginPopup.present();
    }

  } // presentPopover

}
