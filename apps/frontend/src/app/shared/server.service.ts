import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {
  ChatroomGQL,
  ChatroomQuery,
  ChatroomsGQL,
  ChatroomsQuery,
  LoginGQL,
  MessagesGQL,
  MessagesQuery,
  SignupGQL
} from "../graphql/generated";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private apollo: Apollo,
              private messagesGQL: MessagesGQL,
              private chatroomsGQL: ChatroomsGQL,
              private loginGQL: LoginGQL,
              private signupGQL: SignupGQL,
              private chatroomGQL: ChatroomGQL) {
  }

  login(email: string, password: string) {
    return this.loginGQL.mutate({email, password}).pipe(map(result => result.data?.login.token));
  }

  signup(firstname: string, lastname: string,
         email: string, password: string,
         passwordRepeat: string) {
    return this.signupGQL.mutate({
      email,
      password,
      firstname,
      lastname,
      passwordRepeat
    }).pipe(map(result => result.data?.signup.token));
  }

  messages(): Observable<MessagesQuery['messages']> {
    return this.messagesGQL.watch().valueChanges.pipe(
      map(result => result.data.messages));
  }

  chatrooms(): Observable<ChatroomsQuery['chatrooms']> {
    return this.chatroomsGQL.watch().valueChanges.pipe(
      map(result => result.data.chatrooms));
  }

  chatroom(id: string): Observable<ChatroomQuery['chatroom']> {
    return this.chatroomGQL.watch({id}).valueChanges.pipe(
      map(result => result.data.chatroom));
  }
}

