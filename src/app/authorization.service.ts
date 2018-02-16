import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx';
import * as shajs from 'sha.js';


import {CookieService} from "ngx-cookie";
import {HelperMethods} from "./helper-methods";
import {RouterConfig} from "./config";
import {ROUTER_CONFIG} from "../assets/config";
import {StaffMember} from "./authorization";

@Injectable()
export class AuthorizationService {

  public AUTHORIZATION_TOKEN_COOKIE = 'authorizationToken';

  private routerConfig: RouterConfig = ROUTER_CONFIG;

  constructor(private http: Http, private cookieService: CookieService) {}

  public login(email: string, password: string): Observable<boolean> {
    const params = {
      email: email,
      password: AuthorizationService.hashPassword(password)
    };
    return this.http.get(this.routerConfig.serverAddress + '/authorize', {params: params})
                    .map(HelperMethods.extractData)
                    .catch(HelperMethods.handleError)
                    .map(response => {
                      if (response.authorized) {
                        this.storeTokenIntoCookies(response.authorizationToken);
                      }
                      return response.authorized;
                    });
  }

  public isAdmin(): Observable<boolean> {
    const params = {
      authorizationToken: this.getToken()
    };
    return this.http.get(this.routerConfig.serverAddress + '/isAdmin', {params: params})
                    .map(HelperMethods.extractData)
                    .catch(HelperMethods.handleError)
                    .map(response => response.admin);
  }

  public isStaff(): Observable<boolean> {
    const params = {
      authorizationToken: this.getToken()
    };
    return this.http.get(this.routerConfig.serverAddress + '/isStaff', {params: params})
                    .map(HelperMethods.extractData)
                    .catch(HelperMethods.handleError)
                    .map(response => response.admin);
  }

  public isAuthenticated(): boolean {
    return this.cookieService.get(this.AUTHORIZATION_TOKEN_COOKIE) != null;
  }

  public logout(): void {
    this.cookieService.remove(this.AUTHORIZATION_TOKEN_COOKIE);
  }

  //actions
  private static hashPassword(rawPassword: string): string {
    return shajs('sha256').update(rawPassword).digest('hex');
  }

  private storeTokenIntoCookies(token: string): void {
    this.cookieService.put(this.AUTHORIZATION_TOKEN_COOKIE, token);
  }

  public getToken(): string {
    return this.cookieService.get(this.AUTHORIZATION_TOKEN_COOKIE);
  }

}
