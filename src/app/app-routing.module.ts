import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardGuard } from './services/auth-guard.guard';
import { HasAccessGuard } from './services/has-access.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profil',
    pathMatch: 'full'
  },
  {
    path: 'profil',
    loadChildren: () =>
      import('./profil/profil.module').then((m) => m.ProfilModule),
    canActivate: [AuthGuardGuard],
    data:{ title: 'Profil | ANYWR'}
  },
  {
    path: 'login',
    canActivate:[HasAccessGuard],
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    data:{ title: 'Login | ANYWR'}
  },
  {
    path: 'signup',
    canActivate:[HasAccessGuard],
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupModule),
    data:{ title: 'Sign up | ANYWR'}
  },
  {
    path: '**',
    component: NotFoundComponent,
    data:{ title: '404 | ANYWR'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
