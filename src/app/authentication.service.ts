import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx';
import {AuthorizationResponse} from "./authentication";
import * as shajs from 'sha.js';


import {CookieService} from "ngx-cookie";

declare var Materialize: any;

@Injectable()
export class AuthenticationService {

  private SERVER_ADDRESS: string = 'http://localhost:2018';
  private AUTHORIZATION_TOKEN_COOKIE = 'authorizationToken';

  constructor(private http: Http, private cookieService: CookieService) {}

  public login(email: string, password: string): Observable<boolean> {
    const params = {
      email: email,
      password: AuthenticationService.hashPassword(password)
    };
    return this.http.get(this.SERVER_ADDRESS + '/authorize', {params: params})
                    .map(AuthenticationService.extractData)
                    .catch(AuthenticationService.handleError)
                    .map(response => {
                      if (response.authorized) {
                        this.storeTokenIntoCookies(response.authorizationToken);
                      }
                      return response.authorized;
                    });
  }

  public isAuthorized(): boolean {
    return this.cookieService.get(this.AUTHORIZATION_TOKEN_COOKIE) != null;
  }

  public logout(): void {
    this.cookieService.remove(this.AUTHORIZATION_TOKEN_COOKIE);
  }

  //actions
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

  private static hashPassword(rawPassword: string): string {
    return shajs('sha256').update(rawPassword).digest('hex');
  }

  private storeTokenIntoCookies(token: string): void {
    this.cookieService.put(this.AUTHORIZATION_TOKEN_COOKIE, token, {expires: AuthenticationService.generateExpireDate()});
  }

  private static generateExpireDate(): Date {
    let current = new Date();
    current.setMinutes(current.getMinutes() + 10);
    return current;
  }
}
