import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Location, Parcel} from "./parcel-management";
import {HelperMethods} from "./helper-methods";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx';
import {RouterConfig} from "./config";
import {ROUTER_CONFIG} from "../assets/config";
import {AuthorizationService} from "./authorization.service";


@Injectable()
export class ParcelManagementService {

  private helperMethods: HelperMethods;
  private routerConfig: RouterConfig = ROUTER_CONFIG;

  constructor(private http: Http, private authorizationService: AuthorizationService) {
    this.helperMethods = new HelperMethods(authorizationService);
  }

  public createParcel(parcel: Parcel): Observable<string> {
    let handOverTimestamp: string = Date.now().toString();
    const parameter = {parcel: parcel};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.routerConfig.serverAddress + '/createParcel', JSON.stringify(parameter), options)
      .map(HelperMethods.extractData)
      .catch(event => this.helperMethods.handleError(event))
      .map(response => response.trackingNumber);
  }

  public listParcelTypes(): Observable<string[]> {
    return this.http.get(this.routerConfig.serverAddress + '/listParcelTypes')
                    .map(HelperMethods.extractData)
                    .catch(event => this.helperMethods.handleError(event))
                    .map(response => response.parcelTypes);
  }

  public getParcel(trackingNumber: string): Observable<Parcel> {
    const params = {trackingNumber: trackingNumber}
    return this.http.get(this.routerConfig.serverAddress + '/getParcel', {params: params})
                    .map(HelperMethods.extractData)
                    .catch(event => this.helperMethods.handleError(event))
                    .map(response => response.parcel);
  }
}
