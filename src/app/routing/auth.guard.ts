import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthorizationService} from "../services/authorization.service";
import {ROUTER_CONFIG} from "../../assets/config";
import {RouterConfig} from "../data-objects/config";
import "rxjs/add/observable/zip";

declare var Materialize: any;

@Injectable()
export class AuthGuard implements CanActivate {

  private routerConfig: RouterConfig = ROUTER_CONFIG;

  constructor(private router: Router,
              private authenticationService: AuthorizationService) {}

  private static showForbiddenToast(url: string): void {
    Materialize.toast('You are not allowed to access the page ' + url, 3000, '');
  }

  public canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let route: string = state.url;
    if (this.isAnonymUser()) {
      return this.canAnonymActivate(route);
    }
    return this.checkPrivileges(route);
  }

  //actions
  private checkPrivileges(route: string): Observable<boolean> {
    return Observable.zip(
      this.authenticationService.isAdmin(),
      this.authenticationService.isStaff(),
      (isAdmin, isStaff) => {
        if (isAdmin) {
          return this.routeMatchesRegexFromList(this.routerConfig.allowedAdminRoutes, route);
        }
        let canAccess = isStaff && this.routeMatchesRegexFromList(this.routerConfig.allowedStaffRoutes, route);
        if (!canAccess) {
          this.router.navigate(['']);
          AuthGuard.showForbiddenToast(route);
        }
        return canAccess
      }
    );
  }

  private canAnonymActivate(route: string): boolean {
    if (!this.routeMatchesRegexFromList(this.routerConfig.allowedUserRoutes, route)) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: route}});
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
