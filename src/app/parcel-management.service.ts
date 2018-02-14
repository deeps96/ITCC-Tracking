import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Location} from "./parcel-management";
import {HelperMethods} from "./helper-methods";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ParcelManagementService {

  private SERVER_ADDRESS: string = 'http://localhost:2018';

  constructor(private http: Http) { }

  public createParcel(departure: Location, destination: Location, parcelTypeName: string): Observable<string> {
    let handOverTimestamp: string = Date.now().toString();
    const parameter = {
      parcelTypeName: parcelTypeName,
      departure: departure,
      destination: destination,
      handOverTimestamp: handOverTimestamp
    };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.SERVER_ADDRESS + '/createParcel', JSON.stringify(parameter), options)
      .map(HelperMethods.extractData)
      .catch(HelperMethods.handleError)
      .map(response => {
        return response.trackingNumber;
      });
  }
}
