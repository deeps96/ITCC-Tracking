import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx';
import {AuthorizationResponse} from "./authentication";

declare var Materialize: any;

@Injectable()
export class AuthenticationService {

  private SERVER_ADDRESS: string = 'http://localhost:2018';

  constructor(private http: Http) {}

  public login(email: string, password: string): Observable<AuthorizationResponse> {
    const params = {
      email: email,
      password: password
    };
    return this.http.get(this.SERVER_ADDRESS + '/authorize', {params: params})
      .map(AuthenticationService.extractData)
      .catch(AuthenticationService.handleError);
  }

  private static extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private static handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    Materialize.toast(errMsg, 3000, "");
    return [];
  }

}
