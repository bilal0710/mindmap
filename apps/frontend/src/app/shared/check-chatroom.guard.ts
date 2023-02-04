import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ChatroomService} from "../chatroom/chatroom.service";

@Injectable({
  providedIn: 'root'
})
export class CheckChatroomGuard implements CanActivate {

  constructor(private chatroomService: ChatroomService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = route.params['id'];
    console.log(route);
    return this.chatroomService.getAllChatrooms().pipe(
      map((chatrooms) => {
        const room = chatrooms.find(room => room.id === id);
        if (room) {
          return true;
        }
        return this.router.createUrlTree(['./404']);
      }));
  }
}
