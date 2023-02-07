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

  whoAmI() {
    return this.serverService.whoAmI();
  }

  subscribeNewMessage(roomId : string) {
    return this.serverService.newMessageSubscriber(roomId);
  }
}
