import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MessageComponent} from "./chatroom/message/message.component";
import {NgxGraphComponent} from "./mindmap/ngx-graph/ngx-graph.component";

const routes: Routes = [
  { path: '', redirectTo: 'message', pathMatch: 'full' },
  {
    path: 'message',
    component: MessageComponent,
  },
  {
    path: 'ngx-graph',
    component: NgxGraphComponent,
  },]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
