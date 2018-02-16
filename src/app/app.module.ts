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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateParcelComponent,
    StaffManagementComponent
  ],
  imports: [
    BrowserModule,
    CookieModule.forRoot(),
    FormsModule,
    HttpModule,
    MaterializeModule,
    AppRoutesModule
  ],
  providers: [AuthorizationService, AuthGuard, ParcelManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
