import {Injectable, OnDestroy} from '@angular/core';

import {Router} from "@angular/router";
import {ServerService} from "../shared/server.service";
import {LoginCredentials} from "../shared/types";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private token: string | undefined | null= null;
  private subscriptions: Subscription[] = [];

  constructor(
    private serverSrv: ServerService,
    private router: Router
  ) {
  }

  autoLogin() {
    return this.token;
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      console.log('token', this.token);
    }

    return this.token;
  }

  login(loginCredentials?: LoginCredentials) {
    this.subscriptions.push(
      this.serverSrv.login(loginCredentials).subscribe({
        next: (result) => {
          this.token = result.data?.token;
          this.token ? localStorage.setItem('ccn_token', this.token) : null;
          //this.adminService.autoAdmin();

          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error(error);
        },
      })
    );
  }

  /*  signup(user: UserSignup) {
      this.serverSrv.signup(user).subscribe({
        next: (result) => {
          this.token = result.token;
          localStorage.setItem('token', this.token);

          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  */
  logout() {
    this.token = '';
    localStorage.removeItem('token');
    //this.adminService.reset();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
