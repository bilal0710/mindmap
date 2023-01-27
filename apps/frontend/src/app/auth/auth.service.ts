import {Injectable, OnDestroy} from '@angular/core';

import {Router} from "@angular/router";
import {ServerService} from "../shared/server.service";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private token: string | undefined | null = null;
  private subscriptions: Subscription[] = [];
  email = "max@email.com";
  password = "123456";

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
      this.token = localStorage.getItem('mindmap_token');
    }
    console.log('token= ', this.token);
    return this.token;
  }

  login(email: string,
        password: string) {
    this.subscriptions.push(
      this.serverSrv.login(email, password).subscribe({
        next: (token) => {
          this.token = token;
          this.token ? localStorage.setItem('mindmap_token', this.token) : null;
          //this.adminService.autoAdmin();
          this.router.navigate(['/ngx-graph']);
        },
        error: (error) => {
          console.error(error);
        },
      })
    );
  }

  signup(firstname: string, lastname: string, email: string, password: string, passwordRepeat: string) {
    this.subscriptions.push(this.serverSrv.signup(firstname, lastname,
      email,
      password,
      passwordRepeat).subscribe({
      next: (token) => {
        this.token = token;
        this.token ? localStorage.setItem('mindmap_token', this.token) : null;
        this.router.navigate(['/ngx-graph']);
      },
      error: (error) => {
        console.error(error);
      },
    }));
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
    //this.adminService.reset();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
