import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {
  ChatroomGQL,
  ChatroomQuery,
  ChatroomsGQL,
  ChatroomsQuery,
  CreateMessageGQL,
  CreateRoomGQL,
  DeleteChatroomGQL, DeleteMapGQL,
  DeleteUserGQL,
  LoginGQL,
  MessagesGQL,
  MessagesQuery,
  MindmapWithRoomIdGQL,
  NewMessageGQL,
  NewMindmapGQL,
  SignupGQL,
  UpdateRoomGQL,
  UpdateUserGQL,
  UsersGQL,
  UsersQuery,
  WhoAmIGQL
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
              private chatroomGQL: ChatroomGQL,
              private usersGQL: UsersGQL,
              private updateChatroomGQL: UpdateRoomGQL,
              private createChatroomGQL: CreateRoomGQL,
              private deleteChatroomGQL: DeleteChatroomGQL,
              private whoAmIGQL: WhoAmIGQL,
              private newMessageGQL: NewMessageGQL,
              private createMessageSubscriptionGQL: CreateMessageGQL,
              private updateUserGQL: UpdateUserGQL,
              private deleteUsersGQL: DeleteUserGQL,
              private newMapGQL: NewMindmapGQL,
              private mindmapWithRoomIdGQL: MindmapWithRoomIdGQL,
              private deleteMapGQL: DeleteMapGQL) {
  }

  login(email: string, password: string) {
    return this.loginGQL.mutate({email, password}).pipe(map(result => result.data?.login.token));
  }

  signup(firstname: string, lastname: string, email: string, password: string, passwordRepeat: string) {
    return this.signupGQL.mutate({
      email,
      password,
      firstname,
      lastname,
      passwordRepeat
    }).pipe(map(result => result.data?.signup.token));
  }

  messages(id: string): Observable<MessagesQuery['messages']> {
    return this.messagesGQL.watch({id}).valueChanges.pipe(
      map(result => result.data.messages)
    );
  }

  chatrooms(): Observable<ChatroomsQuery['chatrooms']> {
    return this.chatroomsGQL.watch().valueChanges.pipe(
      map(result => result.data.chatrooms));
  }

  chatroom(id: string): Observable<ChatroomQuery['chatroom']> {
    return this.chatroomGQL.watch({id}).valueChanges.pipe(
      map(result => result.data.chatroom));
  }

  users(): Observable<UsersQuery['users']> {
    return this.usersGQL.watch().valueChanges.pipe(
      map(result => result.data.users));
  }

  updateChatroom(id: string, name: string, privateRoom: boolean, users: string[]) {
    return this.updateChatroomGQL.mutate({id, name, privateRoom, users})
      .pipe(map(result => result.data?.updateChatroom));
  }

  createChatroom(name: string, privateRoom: boolean, users: string[]) {
    return this.createChatroomGQL.mutate({name, privateRoom, users})
      .pipe(map(result => result.data?.createChatroom));
  }

  deleteChatroom(id: string) {
    return this.deleteChatroomGQL.mutate({roomId: id})
      .pipe(map(result => result.data?.removeChatroom));
  }

  whoAmI() {
    return this.whoAmIGQL.watch().valueChanges.pipe(
      map(result => result.data?.whoAmI)
    );
  }

  newMessageSubscriber(roomId: string) {
    return this.newMessageGQL.subscribe({roomId: roomId});
  }

  newMapSubscriber(roomId: string) {
    return this.newMapGQL.subscribe({roomId: roomId}).pipe(
      map(result => result.data?.newMindmap)
    );
  }

  createMessage(roomId: string, content: string, from: string) {
    return this.createMessageSubscriptionGQL.mutate({roomId, content, from})
      .pipe(map(result => result.data?.createMessage));
  }

  updateUser(id: string, firstname: string, lastname: string,
             email: string, oldPassword: string,
             newPassword: string, newPasswordRepeat: string) {
    return this.updateUserGQL.mutate({id, firstname, lastname, email, oldPassword, newPassword, newPasswordRepeat})
      .pipe(map(result => result.data?.updateUser));
  }

  deleteUser(id: string) {
    return this.deleteUsersGQL.mutate({id}).pipe(map(result => result.data?.deleteUser));
  }

  mindmap(roomId: string) {
    return this.mindmapWithRoomIdGQL.watch({roomId}).valueChanges.pipe(
      map(result => {
        if (result.data === null) {
          return null;
        }
        return result.data.mindmapWithRoomId;
      }));
  }

  deleteMap(id: string) {
    return this.deleteMapGQL.mutate({id}).pipe(map(result => result.data?.removeMindmap));
  }
}

