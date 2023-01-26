import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MessageComponent} from "./chatroom/message/message.component";
import {NgxGraphComponent} from "./mindmap/ngx-graph/ngx-graph.component";
import {AuthenticationComponent} from "./auth/authentication/authentication.component";
import {AuthGuard} from "./auth";

const routes: Routes = [
  { path: '', redirectTo: 'ngx-graph', pathMatch: 'full' },
  {
    path: 'message',
    canActivate: [AuthGuard],
    component: MessageComponent,
  },
  {
    path: 'ngx-graph',
    canActivate: [AuthGuard],
    component: NgxGraphComponent,
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
  },]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
