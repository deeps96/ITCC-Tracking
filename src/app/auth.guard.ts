import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from "./authorization.service";
import {ROUTER_CONFIG} from "../assets/config";
import {RouterConfig} from "./config";
import {forEach} from "@angular/router/src/utils/collection";

@Injectable()
export class AuthGuard implements CanActivate {

  private routerConfig: RouterConfig = ROUTER_CONFIG;

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let route: string = state.url;
    let allow: boolean = false;
    if (this.isAnonymUser()) {
      allow = this.routeMatchesRegexFromList(this.routerConfig.allowedUserRoutes, route);
    } else {
      if (this.authenticationService.isAdmin()) {
        allow = this.routeMatchesRegexFromList(this.routerConfig.allowedAdminRoutes, route);
      } else if (this.authenticationService.isStaff()) {
        allow = this.routeMatchesRegexFromList(this.routerConfig.allowedStaffRoutes, route);
      }
    }
    if (!allow) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});

    }
    return allow;
  }

  private routeMatchesRegexFromList(allowedRoutes: string[], route: string): boolean {
    return allowedRoutes.filter(allowedRoute => route.match(allowedRoute)).length > 0;
  }

  private isAnonymUser(): boolean {
    return !this.authenticationService.isAuthenticated()
  }
}
