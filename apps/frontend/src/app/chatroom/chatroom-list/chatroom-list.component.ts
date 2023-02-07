import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatroomService} from "../chatroom.service";
import {combineLatest, Subscription} from "rxjs";
import {ChatroomsQuery, WhoAmIQuery} from "../../graphql/generated";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {MatSelectionList} from "@angular/material/list";

@Component({
  selector: 'mindmap-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss'],
})
export class ChatroomListComponent implements OnDestroy, OnInit {

  chatrooms: ChatroomsQuery["chatrooms"] = [];
  user !: WhoAmIQuery["whoAmI"];
  @ViewChild('roomList') roomList!: MatSelectionList;
  subscription: Subscription[] = []

  constructor(private chatroomService: ChatroomService,
              private _snackBar: MatSnackBar,
              private t: TranslateService,
              private router: Router) {
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {

    this.subscription.push(
      combineLatest([
        this.chatroomService.getAllChatrooms(),
        this.chatroomService.whoAmI()]).subscribe(([chatrooms, user]) => {
        this.chatrooms = chatrooms;
        this.user = user;
      }));
    this.subscription.push(this.chatroomService.chatroom$.subscribe((data) => {
      if (!data) return;
      this.chatrooms = [...data];
    }));
  }

  deleteRoom(id: string) {
    this.subscription.push(this.chatroomService.deleteChatroom(id).subscribe({
      next: () => {
        this._snackBar.open(this.t.instant("DELETE_CHATROOM_MESSAGE_SUCCESSES"), 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['chatrooms']);
      },
    }));
  }

  navigateToMessageView(room: ChatroomsQuery["chatrooms"][number]) {
    const include = room.users.some(user => user.id === this.user.id);
    if (room.type === 'PUBLIC' || include) {
      this.router.navigate(['chatrooms', room.id]);
      return;
    }
    this._snackBar.open(this.t.instant("PRIVATE_CHATROOM"), 'X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
