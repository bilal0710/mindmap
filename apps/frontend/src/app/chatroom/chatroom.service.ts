import {Injectable} from '@angular/core';
import {ServerService} from "../shared/server.service";
import {ChatroomsQuery} from "../graphql/generated";
import {map, of, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  private chatrooms!: ChatroomsQuery["chatrooms"];
  private chatroomsubject = new Subject<ChatroomsQuery["chatrooms"]>();

  constructor(private serverService: ServerService) {}


  get chatroom$() {
    return this.chatroomsubject.asObservable();
  }

  getAllChatrooms() {
    if (this.chatrooms) return of(this.chatrooms);
    return this.serverService.chatrooms().pipe(
      map((chatrooms) => {
        this.chatrooms = chatrooms;
        return chatrooms;
      })
    );
  }

  getChatroom(id: string) {
    return this.serverService.chatroom(id);
  }

  getAllUsers() {
    return this.serverService.users();
  }

  UpdateChatroom(id: string, name: string, privateRoom: boolean, users: string[]) {
    return this.serverService.updateChatroom(id, name, privateRoom, users).pipe(
      map((chatroom) => {
          const index = this.chatrooms.findIndex(room => room.id === id);
          this.chatrooms[index] = chatroom as ChatroomsQuery["chatrooms"][number];

          return chatroom;
        }
      ));
  }

  CreateChatroom(name: string, privateRoom: boolean, users: string[]) {
    return this.serverService.createChatroom(name, privateRoom, users).pipe(
      map((chatroom) => {
        this.chatrooms.push(chatroom as ChatroomsQuery["chatrooms"][number]);
        return chatroom;
      }));
  }

  deleteChatroom(id: string) {
    return this.serverService.deleteChatroom(id).pipe(
      map((chatroom) => {
        this.chatrooms = this.chatrooms.filter(room => room.id !== id);
        console.log(this.chatrooms);
        this.chatroomsubject.next(this.chatrooms);
        return chatroom;
      }));
  }
}
