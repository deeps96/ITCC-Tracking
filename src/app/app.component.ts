import { Component } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import 'rxjs/add/operator/filter';
import {AuthorizationResponse} from "./authentication";
import {AuthenticationService} from "./authentication.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public showLoginButton ;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        this.showLoginButton = !this.isLoginPage(event) && !this.isLoggedIn();
      });
  }

  //actions
  private isLoginPage(event: NavigationStart): boolean {
    return event.url == '/login';
  }

  private isLoggedIn(): boolean {
    return this.authenticationService.isAuthorized();
  }
}
