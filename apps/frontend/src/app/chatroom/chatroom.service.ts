import {Injectable} from '@angular/core';
import {ServerService} from "../shared/server.service";

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {


  constructor(private serverService : ServerService) { }

  getAllChatrooms() {
    return this.serverService.chatrooms();
  }

  getChatroom(id: string) {
    return this.serverService.chatroom(id);
  }

  getAllUsers(){
  return this.serverService.users();
  }

  UpdateChatroom(id: string, name: string, privateRoom: boolean, users: string[]) {
    return this.serverService.updateChatroom(id, name, privateRoom, users);
  }
}
