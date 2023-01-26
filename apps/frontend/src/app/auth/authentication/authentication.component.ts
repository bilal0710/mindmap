import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'mindmap-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnDestroy {
  email!: string;
  firstname = 'test'
  lastname = 'test';
  password = 'test';
  passwordRepeat = 'test';

  isSignup = false;

  subscription!: Subscription;

  isLoggedIn = false;

  constructor(
    private authSrv: AuthService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleSubmit() {
/*    if (this.isSignup) {
      this.authSrv.signup({
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
        passwordRepeat: this.passwordRepeat,
      });
    } else {
      this.subscription = this.authSrv
        .login({ email: this.email, password: this.password })
        .pipe(
          concatMap((result) => {
            this.isLoggedIn = !!result?.token;

            // TODO: Open snackbar with message login data incorrect

            return this.adminSrv.requestIsAdmin();
          })
        )
        .subscribe({
          next: () => {
            if (this.isLoggedIn) {
              this.router.navigate(['/dashboard']);
            }
          },
          error: () => {
            if (this.isLoggedIn) {
              this.router.navigate(['/dashboard']);
            }
          },
        });
    }*/
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  clickSwitch() {
    this.isSignup = !this.isSignup;
  }
}
