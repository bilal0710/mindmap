import {Injectable, OnDestroy} from '@angular/core';

import {Router} from "@angular/router";
import {ServerService} from "../shared/server.service";
import {Subject, Subscription} from "rxjs";

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
          //this.adminService.autoAdmin();
          this.router.navigate(['/chatrooms']);
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
        this.loginSubject.next(true);
        this.router.navigate(['/chatrooms']);
      },
      error: (error) => {
        console.error(error);
      },
    }));
  }

  logout() {
    this.token = '';
    this.loginSubject.next(false);
    localStorage.removeItem('mindmap_token');
    //this.adminService.reset();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
