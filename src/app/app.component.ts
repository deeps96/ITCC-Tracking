import { Component } from '@angular/core';
import {Location} from '@angular/common'
import {NavigationStart, Router} from "@angular/router";
import 'rxjs/add/operator/filter';
import {AuthorizationService} from "./services/authorization.service";
import 'rxjs/add/operator/timeout'

declare var Materialize: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public showLoading: boolean = true;
  public backendRunning: boolean = true;
  public showLoginButton: boolean;
  public showLogoutButton: boolean;
  public showAdminButtons: boolean;
  public showStaffButtons: boolean;
  public showHomeButton: boolean;

  constructor(private router: Router,
              private authenticationService: AuthorizationService,
              private location: Location) {
    router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => this.updateButtonVisibilities(event));
    this.showPreloader();
  }

  public goBack(): void {
    this.location.back();
  }

  //actions
  private static isParcelDetailPage(event: NavigationStart): boolean {
    return event.url.startsWith('/track');
  }

  private static isLoginPage(event: NavigationStart): boolean {
    return event.url.startsWith('/login');
  }

  private static isHomePage(event: NavigationStart) {
    return event.url == '/';
  }

  private isLoggedIn(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  public logout(): void {
    this.authenticationService.logout();
    this.showLoginButton = true;
    this.showLogoutButton = false;
    this.showStaffButtons = false;
    this.showAdminButtons = false;
    this.routeToIndex();
    Materialize.toast("Successfully logged out.", 3000, "");
  }

  private routeToIndex(): void {
    this.router.navigate(['']);
  }

  private updateButtonVisibilities(event: NavigationStart) {
    this.showHomeButton = !AppComponent.isHomePage(event);
    this.showLoginButton = !AppComponent.isLoginPage(event) && !this.isLoggedIn();
    this.showLogoutButton = !AppComponent.isLoginPage(event) && this.isLoggedIn();
    if (this.isLoggedIn()) {
      this.authenticationService.isAdmin().subscribe(isAdmin => this.showAdminButtons = isAdmin);
      this.authenticationService.isStaff().subscribe(isStaff => this.showStaffButtons = isStaff);
    }
  }

  private showPreloader(): void {
    this.authenticationService.isBackendRunning()
      .timeout(3000)
      .catch(error => {
        this.backendRunning = false;
        this.showLoading = false;
        return [];
      }).subscribe(response => this.showLoading = false);
  }


}
