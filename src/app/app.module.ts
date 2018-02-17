import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MaterializeModule} from "angular2-materialize";
import {AppRoutesModule} from "./app.routes";
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {CookieModule} from "ngx-cookie";
import {AuthorizationService} from "./authorization.service";
import {HttpModule} from "@angular/http";
import { HomeComponent } from './home/home.component';
import { CreateParcelComponent } from './create-parcel/create-parcel.component';
import {ParcelManagementService} from "./parcel-management.service";
import { StaffManagementComponent } from './staff-management/staff-management.component';
import {AuthGuard} from "./auth.guard";
import {StaffManagementService} from "./staff-management.service";
import { ParcelDetailsComponent } from './parcel-details/parcel-details.component';
import {NguiMapModule} from "@ngui/map";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateParcelComponent,
    StaffManagementComponent,
    ParcelDetailsComponent
  ],
  imports: [
    BrowserModule,
    CookieModule.forRoot(),
    FormsModule,
    HttpModule,
    MaterializeModule,
    AppRoutesModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCQLhnDxhB2Gb7CRWLlZvWcYdEqK0GqseI'})
  ],
  providers: [AuthorizationService, AuthGuard, ParcelManagementService, StaffManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
