import {Injectable} from '@angular/core';
import {ServerService} from "../shared/server.service";

@Injectable({
  providedIn: 'root'
})
export class MindmapService {

  constructor(private serverService: ServerService) { }

  newMindMapSubscription(roomId: string) {
  return this.serverService.newMapSubscriber(roomId);
  }

  getMindMap(roomId: string) {
    return this.serverService.mindmap(roomId);
  }
}
