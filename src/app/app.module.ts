import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MaterializeModule} from "angular2-materialize";
import {AppRoutesModule} from "./routing/app.routes";
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {CookieModule} from "ngx-cookie";
import {AuthorizationService} from "./services/authorization.service";
import {HttpModule} from "@angular/http";
import { HomeComponent } from './home/home.component';
import { CreateParcelComponent } from './create-parcel/create-parcel.component';
import {ParcelManagementService} from "./services/parcel-management.service";
import { StaffManagementComponent } from './staff-management/staff-management.component';
import {AuthGuard} from "./routing/auth.guard";
import {StaffManagementService} from "./services/staff-management.service";
import { ParcelDetailsComponent } from './parcel-details/parcel-details.component';
import {NguiMapModule} from "@ngui/map";
import {VerticalTimelineModule} from "angular-vertical-timeline";
import { DataManagementComponent } from './data-management/data-management.component';
import {DataManagementService} from "./services/data-management.service";
import { ParcelTypeComponent } from './parcel-type/parcel-type.component';
import { ActionDescriptionComponent } from './action-description/action-description.component';
import { TransportationModeComponent } from './transportation-mode/transportation-mode.component';
import { AddStationComponent } from './add-station/add-station.component';
import {TextMaskModule} from "angular2-text-mask";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateParcelComponent,
    StaffManagementComponent,
    ParcelDetailsComponent,
    DataManagementComponent,
    ParcelTypeComponent,
    ActionDescriptionComponent,
    TransportationModeComponent,
    AddStationComponent
  ],
  imports: [
    BrowserModule,
    CookieModule.forRoot(),
    FormsModule,
    HttpModule,
    MaterializeModule,
    AppRoutesModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCQLhnDxhB2Gb7CRWLlZvWcYdEqK0GqseI'}),
    VerticalTimelineModule,
    TextMaskModule
  ],
  providers: [
    AuthorizationService,
    AuthGuard,
    DataManagementService,
    ParcelManagementService,
    StaffManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
