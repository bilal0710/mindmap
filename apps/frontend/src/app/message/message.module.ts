import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBaseComponent } from './message-base/message-base.component';
import { NgxGraphComponent } from '../mindmap/ngx-graph/ngx-graph.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [MessageBaseComponent, NgxGraphComponent, MessageComponent],
  imports: [CommonModule, NgxGraphModule],
})
export class MessageModule {}
