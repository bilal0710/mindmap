import {Injectable} from '@angular/core';
import {ServerService} from "../shared/server.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private serverService: ServerService) {
  }

  getMessages(roomId: string) {
    return this.serverService.messages(roomId);
  }

  subscribeNewMessage(roomId: string) {
    return this.serverService.newMessageSubscriber(roomId);
  }

  createMessage(roomId: string, message: string, from: string) {
    return this.serverService.createMessage(roomId, message, from);
  }
}
