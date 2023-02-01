import {Component} from '@angular/core';
import {ChatroomService} from "../chatroom.service";

@Component({
  selector: 'mindmap-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss'],
})
export class ChatroomListComponent {

  createComponent = false;

  constructor(private chatroomService: ChatroomService) {
  }
}
