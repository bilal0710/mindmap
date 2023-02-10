import {Injectable} from '@angular/core';
import {ServerService} from "../shared/server.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MindmapService {

  nodeSubject = new Subject<string[]>();

  constructor(private serverService: ServerService) { }

  newMindMapSubscription(roomId: string) {
  return this.serverService.newMapSubscriber(roomId);
  }

  getMindMap(roomId: string) {
    return this.serverService.mindmap(roomId);
  }

  deleteMindMap(id: string) {
    return this.serverService.deleteMap(id);
  }
}
