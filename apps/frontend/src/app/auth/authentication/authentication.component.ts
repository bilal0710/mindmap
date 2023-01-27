import {Component, OnDestroy} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'mindmap-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  email!: string;
  firstname!: string;
  lastname !: string;
  password !: string;
  passwordRepeat !: string;
  isSignup = false;

  constructor(
    private authSrv: AuthService,
    private router: Router
  ) {
  }

  handleSubmit() {
    if (this.isSignup) {
      this.authSrv.signup(
        this.firstname,
        this.lastname,
        this.email,
        this.password,
        this.passwordRepeat,
      );
    } else {
      this.authSrv.login(this.email, this.password);
    }
  }

  clickSwitch() {
    this.isSignup = !this.isSignup;
  }
}
