import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GraphModule} from '@swimlane/ngx-graph';
import {MessageComponent} from './chatroom/message/message.component';
import {NgxGraphComponent} from './mindmap/ngx-graph/ngx-graph.component';
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {AngularMaterialModule} from "./angular-material.module";

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    NgxGraphComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GraphModule,
    RouterModule,
    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
