import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MessageComponent} from "./chatroom/message/message.component";
import {AuthenticationComponent} from "./auth/authentication/authentication.component";
import {AuthGuard} from "./auth";
import {ChatroomListComponent} from "./chatroom/chatroom-list/chatroom-list.component";
import {ProfileComponent} from "./profile/profile.component";
import {NgxGraphComponent} from "./mindmap/ngx-graph/ngx-graph.component";
import {ChatroomComponent} from "./chatroom/chatroom/chatroom.component";
import {ChatroomBaseComponent} from "./chatroom/chatroom-base/chatroom-base.component";

const routes: Routes = [
  {path: '', redirectTo: '/chatrooms', pathMatch: 'full'},
  {
    path: 'chatrooms',
    canActivate: [AuthGuard],
    component: ChatroomBaseComponent,
    children: [
      { path: '', component: ChatroomListComponent},
      { path: ':id', component: ChatroomComponent}
    ]
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  {
    path: 'ngx-graph',
    canActivate: [AuthGuard],
    component: NgxGraphComponent,
  },
  {
    path: 'message',
    canActivate: [AuthGuard],
    component: MessageComponent,
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
  },]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
