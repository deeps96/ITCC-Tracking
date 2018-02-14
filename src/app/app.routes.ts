import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import {HomeComponent} from "./home/home.component";

export const ROUTE_CONFIG: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];


export const AppRoutesModule = RouterModule.forRoot(ROUTE_CONFIG);
