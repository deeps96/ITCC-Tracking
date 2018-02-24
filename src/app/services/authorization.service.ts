import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx';
import * as shajs from 'sha.js';


import {CookieService} from "ngx-cookie";
import {HelperMethods} from "../helper-methods";
import {RouterConfig} from "../data-objects/config";
import {ROUTER_CONFIG} from "../../assets/config";
import {Router} from "@angular/router";

@Injectable()
export class AuthorizationService {

  public AUTHORIZATION_TOKEN_COOKIE = 'authorizationToken';

  private helperMethods: HelperMethods;
  private routerConfig: RouterConfig = ROUTER_CONFIG;

  constructor(private router: Router,
              private http: Http,
              private cookieService: CookieService) {
    this.helperMethods = new HelperMethods(this);
  }

  public isBackendRunning(): Observable<Response> {
    return this.http.get(this.routerConfig.serverAddress);
  }

  public login(email: string, password: string): Observable<boolean> {
    const params = {
      email: email,
      password: AuthorizationService.hashPassword(password)
    };
    return this.http.get(this.routerConfig.serverAddress + '/authorize', {params: params})
                    .map(HelperMethods.extractData)
                    .catch(event => this.helperMethods.handleError(event))
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
                    .catch(event => this.helperMethods.handleError(event))
                    .map(response => response.admin);
  }

  public isStaff(): Observable<boolean> {
    const params = {
      authorizationToken: this.getToken()
    };
    return this.http.get(this.routerConfig.serverAddress + '/isStaff', {params: params})
                    .map(HelperMethods.extractData)
                    .catch(event => this.helperMethods.handleError(event))
                    .map(response => response.staff);
  }

  public isAuthenticated(): boolean {
    return this.cookieService.get(this.AUTHORIZATION_TOKEN_COOKIE) != null;
  }

  public logout(): void {
    this.cookieService.remove(this.AUTHORIZATION_TOKEN_COOKIE);
    this.router.navigateByUrl('/login');
    const params = {
      authorizationToken: this.getToken()
    };
    this.http.delete(this.routerConfig.serverAddress + '/logout', {params: params}).subscribe();
  }

  //actions
  public static hashPassword(rawPassword: string): string {
    return shajs('sha256').update(rawPassword).digest('hex');
  }

  private storeTokenIntoCookies(token: string): void {
    this.cookieService.put(this.AUTHORIZATION_TOKEN_COOKIE, token);
  }

  public getToken(): string {
    return this.cookieService.get(this.AUTHORIZATION_TOKEN_COOKIE);
  }

}
