import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree,} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authSrv: AuthService, private router: Router) {
  }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.authSrv.getToken();
    if (token !== null) {
      return true;
    }
    return this.router.createUrlTree(['./auth']);
  }
}
