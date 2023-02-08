import {Injectable} from '@angular/core';
import {ServerService} from "../shared/server.service";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private serverSrv: ServerService,
    private auchSrv: AuthService,
  ) {
  }

  updateUser(id: string, firstname: string, lastname: string,
             email: string, oldPassword: string,
             newPassword: string, newPasswordRepeat: string) {

    return this.serverSrv.updateUser(id, firstname, lastname, email, oldPassword, newPassword, newPasswordRepeat);
  }

  deleteUser(id: string) {
    return this.serverSrv.deleteUser(id);
  }

  logout() {
    this.auchSrv.logout();
  }
}
