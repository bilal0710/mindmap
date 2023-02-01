import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatroomListComponent} from './chatroom-list/chatroom-list.component';
import {AngularMaterialModule} from '../angular-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {ChatroomCreateComponent} from './chatroom-create/chatroom-create.component';
import {LibraryModule} from "../lib/library.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ChatroomListComponent, ChatroomCreateComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    TranslateModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,

  ],
})
export class ChatroomModule {
}
