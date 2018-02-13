import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import * as shajs from 'sha.js';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('wrongCredentialAlert') private wrongCredentialAlert : ElementRef;

  public email: string;
  public password: string;

  constructor(private authenticationService: AuthenticationService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
  }

  public onSubmit(): void {
    let hashedPassword: string = LoginComponent.hashPassword(this.password);
    this.authenticationService
      .login(this.email, hashedPassword)
      .subscribe(response => {
        if (!response.authorized) {
          this.showWrongCredentialsAlert();
        } else {
          this.hideWrongCredentialsAlert();
          this.storeTokenIntoCookies(response.authorizationToken);
          this.routeToIndex();
        }
      });
  }

  private static hashPassword(rawPassword: string): string {
    return shajs('sha256').update(rawPassword).digest('hex');
  }

  private storeTokenIntoCookies(token: string): void {
    this.cookieService.put("authorizationToken", token, {expires: LoginComponent.generateExpireDate()});
  }

  private static generateExpireDate(): Date {
    let current = new Date();
    current.setMinutes(current.getMinutes() + 10);
    return current;
  }

  private routeToIndex(): void {
    this.router.navigate(['']);
  }

  private showWrongCredentialsAlert(): void {
    this.wrongCredentialAlert.nativeElement.style.display = 'inherit';
  }

  private hideWrongCredentialsAlert(): void {
    this.wrongCredentialAlert.nativeElement.style.display = 'none';
  }

}
