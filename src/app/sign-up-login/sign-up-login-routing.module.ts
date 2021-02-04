import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpLoginPage } from './sign-up-login.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpLoginPage
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpLoginPageRoutingModule {}
