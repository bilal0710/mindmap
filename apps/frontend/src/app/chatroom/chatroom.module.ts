import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatroomListComponent } from './chatroom-list/chatroom-list.component';
import { AngularMaterialModule } from '../angular-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { LibraryModule } from '../lib/library.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ChatroomBaseComponent } from './chatroom-base/chatroom-base.component';

@NgModule({
  declarations: [
    ChatroomListComponent,
    ChatroomComponent,
    ChatroomBaseComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    TranslateModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class ChatroomModule {}
