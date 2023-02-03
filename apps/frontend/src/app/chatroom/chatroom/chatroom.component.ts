import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ChatroomService} from "../chatroom.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {UsersQuery} from "../../graphql/generated";

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
  ) {
  }


  ngOnInit(): void {
    this.subscriptions.push(
      this.activeRoute.paramMap.subscribe((params) => {
        this.id = params.get('id') || '';
      }));
    this.subscriptions.push(
      this.chatroomService.getAllUsers().subscribe(users => {
        this.userList = users;
      })
    );
    if (this.id) {
      this.subscriptions.push(this.chatroomService.getChatroom(this.id).subscribe((data) => {
        if(!data) return;
        this.chatroomName = data.name;
        this.roomPrivacy = data.type === 'PRIVATE'
        const users = this.userList.filter(user => data.users.filter(item => item.id === user.id).length > 0);
        console.log(users);
        this.selectedUser.setValue(users);
        console.log(this.selectedUser.getRawValue());
      }));
    }

  }

  /*remove(user: UsersQuery['users']): void {
    const index = this.selectedUser.value?.indexOf(user);
    if (index !== undefined && index !== -1 && this.selectedUser.value) {
      console.log(this.selectedUser.value[index]);
      this.selectedUser.value?.splice(index, 1);
    }
  }*/

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}