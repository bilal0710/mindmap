import { Injectable } from '@angular/core';
import {ServerService} from "../shared/server.service";

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  constructor(private serverService : ServerService) { }

  getAllChatrooms() {
    return this.serverService.chatrooms();
  }
}
