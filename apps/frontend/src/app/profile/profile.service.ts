import { Injectable } from '@angular/core';
import {User} from "../graphql/generated";
import {Subject} from "rxjs";
import {ServerService} from "../shared/server.service";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profileData!: User;
  submitProfileData = new Subject<User>();
  updateProfileData = new Subject<User>();
  deleteUserData = new Subject<User>();

  constructor(
    private serverSrv: ServerService,
    private authService: AuthService,
    private router: Router
  ) {}

  getProfileData() {
    console.log('getProfileData()');
    // this.serverSrv.me().subscribe({
    //   next: (result) => {
    //     this.profileData = result;
    //     this.submitProfileData.next(this.profileData);
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   },
    // });
    //
    // return this.profileData;
  }

  // updateUser(id: string, data: UpdateUser) {
  updateUser(id: string) {
    console.log('updateUser()');
    // this.serverSrv.updateUser(id, data).subscribe({
    //   next: (result) => {
    //     this.profileData = result;
    //     this.updateProfileData.next(this.profileData);
    //   },
    //   error: (error) => {
    //     this.updateProfileData.next(error);
    //   },
    // });
    //
    // return this.profileData;
  }

  deleteUser(id: string) {
    console.log('updateUser()');
    // this.serverSrv.deleteUser(id).subscribe({
    //   next: (res) => {
    //     this.authService.logout();
    //
    //     this.deleteUserData.next(res);
    //   },
    //   error: (error) => {
    //     this.deleteUserData.next(error);
    //   },
    // });
  }
}
