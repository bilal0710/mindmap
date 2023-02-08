import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'mindmap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  _mobileQueryListener: () => void;
  changeAuthStatus = false;
  isLogged = false;
  subscription = new Subscription()

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private router: Router,
    private t: TranslateService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 700px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    this.t.addLangs(['en', 'de']);
    this.t.setDefaultLang('en');

    const localStoredLang = localStorage.getItem('mindmap_lang');
    const browserLang = this.t.getBrowserLang();

    this.t.use(localStoredLang || browserLang || this.t.defaultLang);
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.subscription = this.authService.isAuth$.subscribe(result => {
      this.isLogged = result;
    });
  }

  auth() {
    this.changeAuthStatus = !this.changeAuthStatus;
    this.authService.signupSubject.next(this.changeAuthStatus);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.subscription.unsubscribe();
  }

}
