import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "../login/login.component";
import {HomeComponent} from "../home/home.component";
import {StaffManagementComponent} from "../staff-management/staff-management.component";
import {AuthGuard} from "./auth.guard";
import {ParcelDetailsComponent} from "../parcel-details/parcel-details.component";
import {DataManagementComponent} from "../data-management/data-management.component";
import {AddStationComponent} from "../add-station/add-station.component";

export const ROUTE_CONFIG: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'staff',
    canActivate: [AuthGuard],
    component: StaffManagementComponent
  },
  {
    path: 'track/:trackingNumber',
    component: ParcelDetailsComponent
  },
  {
    path: 'data',
    canActivate: [AuthGuard],
    component: DataManagementComponent
  },
  {
    path: 'parcelManagement',
    canActivate: [AuthGuard],
    component: AddStationComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const AppRoutesModule = RouterModule.forRoot(ROUTE_CONFIG);
