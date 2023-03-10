import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GraphModule} from '@swimlane/ngx-graph';
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {AngularMaterialModule} from "./angular-material.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AuthModule} from "./auth/auth.module";
import {GraphQLModule} from './graphql.module';
import {ChatroomModule} from "./chatroom/chatroom.module";
import {ProfileComponent} from "./profile/profile.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {MessageModule} from "./message/message.module";


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GraphModule,
    RouterModule,
    AngularMaterialModule,
    AuthModule,
    MessageModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    GraphQLModule,
    ChatroomModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule {}
