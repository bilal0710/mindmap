import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  autoLogin() {
    return this.token;
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }

    return this.token;
  }

/*  login(user: User) {
    return this.serverSrv.login(user).pipe(
      map((result) => {
        this.token = result.token;
        localStorage.setItem('token', this.token);

        return result;
      })
    );
  }*/

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

  logout() {
    this.token = '';
    localStorage.removeItem('token');

    this.adminService.reset();
  }*/
}
