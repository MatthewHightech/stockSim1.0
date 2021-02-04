import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpLoginPageRoutingModule } from './sign-up-login-routing.module';

import { SignUpLoginPage } from './sign-up-login.page';
import { AuthPopupComponent } from './auth-popup/auth-popup.component'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpLoginPageRoutingModule
  ],
  declarations: [SignUpLoginPage, AuthPopupComponent]
})
export class SignUpLoginPageModule {}
