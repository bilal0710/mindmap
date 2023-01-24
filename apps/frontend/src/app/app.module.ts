import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {GraphModule} from "@swimlane/ngx-graph";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, GraphModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
