import {Component, OnDestroy} from '@angular/core';
import {ChatroomService} from "../chatroom.service";
import {ChatroomItem} from "../../shared/types";
import {Subscription} from "rxjs";

@Component({
  selector: 'mindmap-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss'],
})
export class ChatroomListComponent implements OnDestroy {

  chatrooms: ChatroomItem[] = [];
  createComponent = false;

  subscription = new Subscription();

  constructor(private chatroomService: ChatroomService) {
    this.subscription = this.chatroomService.getAllChatrooms().subscribe(chatrooms => {
      //console.log('chatroomList', chatrooms);
      this.chatrooms = chatrooms;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
