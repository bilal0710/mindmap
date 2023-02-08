import {Injectable, OnDestroy} from '@angular/core';

import {Router} from "@angular/router";
import {ServerService} from "../shared/server.service";
import {Subject, Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private token: string | undefined | null = null;
  private subscriptions: Subscription[] = [];
  signupSubject = new Subject<boolean>();
  private loginSubject = new Subject<boolean>();

  get isAuth$() {
    return this.loginSubject.asObservable();
  }

  constructor(
    private serverSrv: ServerService,
    private router: Router,
    private snackBar: MatSnackBar,
    private t: TranslateService,
  ) {
  }

  autoLogin() {
    return this.token;
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('mindmap_token');
    }
    this.loginSubject.next(!!this.token);
    return this.token;
  }

  login(email: string,
        password: string) {
    this.subscriptions.push(
      this.serverSrv.login(email, password).subscribe({
        next: (token) => {
          this.token = token;
          this.token ? localStorage.setItem('mindmap_token', this.token) : null;
          this.loginSubject.next(true);
          this.router.navigate(['/chatrooms']);
        },
        error: (error) => {
          this.snackBar.open(error.message, undefined, {
            panelClass: 'snackbar-error',
          });
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
        this.loginSubject.next(true);
        this.router.navigate(['/chatrooms']);
      },
      error: (error) => {
        this.snackBar.open(error.message, undefined, {
          panelClass: 'snackbar-error',
        });
      },
    }));
  }

  logout() {
    this.token = '';
    this.loginSubject.next(false);
    localStorage.removeItem('mindmap_token');
    this.snackBar.open(this.t.instant('PROFILES.LOGOUT_SUCCESS'), undefined, {
      panelClass: 'snackbar-success',
    });
    //this.adminService.reset();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
