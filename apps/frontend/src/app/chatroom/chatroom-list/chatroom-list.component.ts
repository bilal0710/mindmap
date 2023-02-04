import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatroomService} from "../chatroom.service";
import {Subscription} from "rxjs";
import {ChatroomsQuery} from "../../graphql/generated";

@Component({
  selector: 'mindmap-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss'],
})
export class ChatroomListComponent implements OnDestroy, OnInit {

  chatrooms: ChatroomsQuery["chatrooms"] = [];

  subscription = new Subscription();

  constructor(private chatroomService: ChatroomService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.chatroomService.getAllChatrooms().subscribe(chatrooms => {
      console.log('chatroomList', chatrooms);
      this.chatrooms = chatrooms;
    });
  }

}
