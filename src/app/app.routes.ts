import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";

export const ROUTE_CONFIG: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];


export const AppRoutesModule = RouterModule.forRoot(ROUTE_CONFIG);
