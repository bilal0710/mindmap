import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ChatroomService} from "../chatroom.service";
import {ActivatedRoute, Router} from "@angular/router";
import {combineLatest, Subscription} from "rxjs";
import {UsersQuery} from "../../graphql/generated";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'mindmap-chatroom-create',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit, OnDestroy {
  id = '';
  chatroomName = '';
  selectedUser = new FormControl<UsersQuery['users']>([]);
  userList!: UsersQuery['users'];
  roomPrivacy = false;

  subscriptions: Subscription[] = [];


  constructor(private chatroomService: ChatroomService,
              private activeRoute: ActivatedRoute,
              private _snackBar: MatSnackBar,
              public t: TranslateService,
              private router: Router
  ) {
  }


  ngOnInit(): void {
    this.subscriptions.push(
      this.activeRoute.paramMap.subscribe((params) => {
        this.id = params.get('id') || '';
        this.id = this.id === 'create' ? '' : this.id;
      }));

    if (this.id !== '') {
      this.subscriptions.push(combineLatest([
          this.chatroomService.getAllUsers(),
          this.chatroomService.getChatroom(this.id),
        ]).subscribe(result => {
          this.userList = result[0];
          if (!result[1]) return;
          const data = result[1];
          this.chatroomName = data.name;
          this.roomPrivacy = data.type === 'PRIVATE'
          const users = this.userList.filter(user => data.users.filter(item => item.id === user.id).length > 0);
          this.selectedUser.setValue(users);
        })
      )
    }
  }

  remove(user: UsersQuery['users'][number]): void {
    const index = this.selectedUser.value?.indexOf(user);
    if (index !== undefined && index !== -1 && this.selectedUser.value) {
      this.selectedUser.value?.splice(index, 1);
    }
  }

  save() {
    const users = this.selectedUser.value?.map(user => user.id);
    if (this.id !== '') {
      this.subscriptions.push(this.chatroomService.UpdateChatroom(this.id, this.chatroomName, this.roomPrivacy, users || []).subscribe(
        {
          next: () => {
            this._snackBar.open(this.t.instant("UPDATE_CHATROOM_MESSAGE_SUCCESSES"), 'X', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.router.navigate(['chatrooms']);
          },
          error: (error) => {
            this._snackBar.open(error.message, undefined, {
              panelClass: 'snackbar-error',
            });
          }
        }
      ));
      return;
    }
    this.subscriptions.push(this.chatroomService.CreateChatroom(this.chatroomName, this.roomPrivacy, users || []).subscribe(
      {
        next: () => {
          this._snackBar.open(this.t.instant("CREATE_CHATROOM_MESSAGE_SUCCESSES"), 'X', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate(['chatrooms']);
        },
        error: (error) => {
          this._snackBar.open(error.message, undefined, {
            panelClass: 'snackbar-error',
          });
        }
      }
    ));

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
