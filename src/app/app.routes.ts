import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";

export const ROUTE_CONFIG: Routes = [
  /*{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }*/
  {
    path: 'login',
    component: LoginComponent
  }
];


export const AppRoutesModule = RouterModule.forRoot(ROUTE_CONFIG);
