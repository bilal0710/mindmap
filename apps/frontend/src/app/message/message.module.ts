import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBaseComponent } from './message-base/message-base.component';
import { NgxGraphComponent } from '../mindmap/ngx-graph/ngx-graph.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MessageComponent } from './message/message.component';
import {AngularMaterialModule} from "../angular-material.module";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [MessageBaseComponent, NgxGraphComponent, MessageComponent],
  imports: [CommonModule, NgxGraphModule, AngularMaterialModule, TranslateModule, FormsModule],
})
export class MessageModule {}
