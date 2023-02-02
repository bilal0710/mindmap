import {Component, Input, OnInit} from '@angular/core';
import {ChatroomsQuery, ChatroomType} from "../../graphql/generated";
import {ChatroomService} from "../../chatroom/chatroom.service";

@Component({
  selector: 'mindmap-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() list!: ChatroomsQuery["chatrooms"];

constructor(private chatroomService: ChatroomService) {
}
}
