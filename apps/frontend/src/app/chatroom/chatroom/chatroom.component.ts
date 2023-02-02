import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {ChatroomService} from "../chatroom.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ChangeDetection} from "@angular/cli/lib/config/workspace-schema";

@Component({
  selector: 'mindmap-chatroom-create',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit, OnDestroy {
  id = '';
  chatroomName = '';
  selectedUser = new FormControl<string[]>([]);
  userList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni',
    'Sausage', 'Tomato', 'Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry',
    'Sausage', 'Tomato', 'Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry',
    'Sausage', 'Tomato', 'Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  subscriptions: Subscription[] = [];


  constructor(private chatroomService: ChatroomService,
              private activeRoute: ActivatedRoute,
              private changeDetection: ChangeDetectorRef) {
  }



  ngOnInit(): void {
    this.subscriptions.push(
      this.activeRoute.paramMap.subscribe((params) => {
        this.id = params.get('id') || '';
      }));
    console.log('id= ', this.id);
    if (this.id) {
      this.subscriptions.push(this.chatroomService.getChatroom(this.id).subscribe((data) => {
        this.chatroomName = data.name || '';
        this.userList = data.users?.map((user) => user.firstname + ' ' + user.lastname) || [];
        const users = [this.userList[0], this.userList[1]];
        console.log('users= ', this.selectedUser.value);
        this.selectedUser.setValue(users);
      }));
    }
  }
  remove(fruit: string): void {
    const index = this.selectedUser.value?.indexOf(fruit);
    if (index !== undefined && index !== -1 && this.selectedUser.value) {
      console.log(this.selectedUser.value[index]);
      this.selectedUser.value?.splice(index, 1);
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (event.value) {
      this.selectedUser.value?.push(value);
    }
  }

}
