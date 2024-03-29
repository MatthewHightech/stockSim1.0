import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-up-login',
    pathMatch: 'full'
  },
  {
    path: 'sign-up-login',
    loadChildren: () => import('./sign-up-login/sign-up-login.module').then( m => m.SignUpLoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
