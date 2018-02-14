import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('wrongCredentialAlert') private wrongCredentialAlert : ElementRef;

  public email: string;
  public password: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    let isAuthorized = this.authenticationService.isAuthorized();
    if (isAuthorized) {
      this.routeToIndex();
    }
  }

  public onSubmit(): void {
    this.authenticationService
      .login(this.email, this.password)
      .subscribe(response => {
        if (response) {
          this.hideWrongCredentialsAlert();
          this.routeToIndex();
        } else {
          this.showWrongCredentialsAlert();
        }
      });
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
