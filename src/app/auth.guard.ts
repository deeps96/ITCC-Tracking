import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthorizationService} from "./authorization.service";
import {ROUTER_CONFIG} from "../assets/config";
import {RouterConfig} from "./config";

declare var Materialize: any;

@Injectable()
export class AuthGuard implements CanActivate {

  private routerConfig: RouterConfig = ROUTER_CONFIG;

  constructor(private router: Router, private authenticationService: AuthorizationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let route: string = state.url;
    let allow: boolean = false;
    if (this.isAnonymUser()) {
      return this.canAnonymActivate(route);
    }
    return this.authenticationService.isAdmin().map(response => {
      if (response) {
        return this.routeMatchesRegexFromList(this.routerConfig.allowedAdminRoutes, route);
      } else {
        return this.authenticationService.isStaff().map(response => {
          response && this.routeMatchesRegexFromList(this.routerConfig.allowedStaffRoutes, route);
        }).map(allowed => {
          if (!allowed) {
            this.router.navigate(['']);
            this.showForbiddenToast(route);
          }
          return allowed;
        }).subscribe();
      }
    });

  }

  //actions
  private showForbiddenToast(url: string): void {
    Materialize.toast('You are not allowed to access the page ' + url, 3000, "");
  }

  private canAnonymActivate(route: string): boolean {
    if (!this.routeMatchesRegexFromList(this.routerConfig.allowedUserRoutes, route)) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: route }});
      return false;
    }
    return true;
  }

  private routeMatchesRegexFromList(allowedRoutes: string[], route: string): boolean {
    return allowedRoutes.filter(allowedRoute => route.match(allowedRoute)).length > 0;
  }

  private isAnonymUser(): boolean {
    return !this.authenticationService.isAuthenticated()
  }
}
