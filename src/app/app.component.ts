import { Component } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import 'rxjs/add/operator/filter';
import {AuthorizationService} from "./authorization.service";

declare var Materialize: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public showLoginButton: boolean;
  public showLogoutButton: boolean;
  public showNav: boolean;

  constructor(private router: Router, private authenticationService: AuthorizationService) {
    router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        this.showLoginButton = !AppComponent.isLoginPage(event) && !this.isLoggedIn();
        this.showLogoutButton = !AppComponent.isLoginPage(event) && this.isLoggedIn();
        this.showNav = !AppComponent.isParcelDetailPage(event);
      });
  }

  //actions
  private static isParcelDetailPage(event: NavigationStart): boolean {
    return event.url.startsWith('/track');
  }

  private static isLoginPage(event: NavigationStart): boolean {
    return event.url == '/login';
  }

  private isLoggedIn(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  public logout(): void {
    this.authenticationService.logout();
    this.showLoginButton = true;
    this.showLogoutButton = false;
    this.routeToIndex();
    Materialize.toast("Successfully logged out.", 3000, "");
  }

  private routeToIndex(): void {
    this.router.navigate(['']);
  }

}
