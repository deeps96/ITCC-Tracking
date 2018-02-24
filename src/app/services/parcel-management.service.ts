import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Location, Parcel, Station} from "../data-objects/parcel-management";
import {HelperMethods} from "../helper-methods";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx';
import {RouterConfig} from "../data-objects/config";
import {ROUTER_CONFIG} from "../../assets/config";
import {AuthorizationService} from "./authorization.service";
import {StaffMember} from "../data-objects/authorization";


@Injectable()
export class ParcelManagementService {

  private helperMethods: HelperMethods;
  private routerConfig: RouterConfig = ROUTER_CONFIG;

  constructor(private http: Http, private authorizationService: AuthorizationService) {
    this.helperMethods = new HelperMethods(authorizationService);
  }

  public createParcel(parcel: Parcel): Observable<string> {
    parcel.handOverTimestamp = new Date().getTime();
    const parameter = {parcel: parcel};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.routerConfig.serverAddress + '/createParcel', JSON.stringify(parameter), options)
      .map(HelperMethods.extractData)
      .catch(event => this.helperMethods.handleError(event))
      .map(response => response.trackingNumber);
  }

  public getParcel(trackingNumber: string): Observable<Parcel> {
    const params = {trackingNumber: trackingNumber}
    return this.http.get(this.routerConfig.serverAddress + '/getParcel', {params: params})
                    .map(HelperMethods.extractData)
                    .catch(event => this.helperMethods.handleError(event))
                    .map(response => response.parcel);
  }

  public addStation(trackingNumber: string, station: Station): Observable<Response> {
    station.timestamp = new Date().getTime();
    const body = {
      authorizationToken: this.authorizationService.getToken(),
      station: station,
      trackingNumber: trackingNumber
    };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.patch(this.routerConfig.serverAddress + '/addStation', JSON.stringify(body), options)
      .catch(event => this.helperMethods.handleError(event));
  }
}
