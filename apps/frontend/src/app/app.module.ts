import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxGraphModule} from "@swimlane/ngx-graph";

@NgModule({
  declarations: [AppComponent],
    imports: [BrowserModule, HttpClientModule, NgxGraphModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
