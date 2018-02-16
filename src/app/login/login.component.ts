import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../authorization.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('wrongCredentialAlert') private wrongCredentialAlert : ElementRef;

  public email: string;
  public password: string;
  private returnUrl: string;

  constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    let isAuthorized = this.authenticationService.isAuthenticated();
    if (isAuthorized) {
      this.routeToPrevPage();
    }
  }

  public onSubmit(): void {
    this.authenticationService
      .login(this.email, this.password)
      .subscribe(response => {
        if (response) {
          this.hideWrongCredentialsAlert();
          this.routeToPrevPage();
        } else {
          this.showWrongCredentialsAlert();
        }
      });
  }



  private routeToPrevPage(): void {
    this.router.navigateByUrl(this.returnUrl);
  }

  private showWrongCredentialsAlert(): void {
    this.wrongCredentialAlert.nativeElement.style.display = 'inherit';
  }

  private hideWrongCredentialsAlert(): void {
    this.wrongCredentialAlert.nativeElement.style.display = 'none';
  }

}
