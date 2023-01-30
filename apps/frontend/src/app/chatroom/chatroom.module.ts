import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatroomListComponent } from './chatroom-list/chatroom-list.component';
import {AngularMaterialModule} from "../angular-material.module";
import {TranslateModule} from "@ngx-translate/core";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [ChatroomListComponent],
  imports: [CommonModule, AngularMaterialModule, TranslateModule, MatTabsModule],
})
export class ChatroomModule {}
