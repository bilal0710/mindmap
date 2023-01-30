import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'mindmap-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  email!: string;
  firstname!: string;
  lastname !: string;
  password !: string;
  passwordRepeat !: string;
  isSignup = false;

  constructor(
    private authSrv: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.authSrv.signupSubject.subscribe(result => this.isSignup = result);
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
