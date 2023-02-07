import {Component} from '@angular/core';

@Component({
  selector: 'mindmap-base-message',
  templateUrl: './message-base.component.html',
  styleUrls: ['./message-base.component.scss'],
})
export class MessageBaseComponent {
  charHeight: number;

  constructor() {
    this.charHeight = window.innerHeight - 64;
  }
}
