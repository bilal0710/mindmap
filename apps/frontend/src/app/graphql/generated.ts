import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Auth = {
  __typename?: 'Auth';
  /** Generated access_token of the user */
  token: Scalars['String'];
};

export type Chatroom = {
  __typename?: 'Chatroom';
  deleted: Scalars['Boolean'];
  id: Scalars['String'];
  messages?: Maybe<Message>;
  mindmapId: Scalars['String'];
  name: Scalars['String'];
  type: ChatroomType;
  users: Array<User>;
};

export enum ChatroomType {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CreateChatroomInput = {
  name: Scalars['String'];
  privateRoom?: InputMaybe<Scalars['Boolean']>;
  users: Array<Scalars['String']>;
};

export type CreateMessageInput = {
  content: Scalars['String'];
  from: Scalars['String'];
  roomId: Scalars['String'];
  to?: InputMaybe<Scalars['String']>;
};

export type CreateMindmapInput = {
  chatroom_id: Scalars['String'];
  parent_id?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  passwordRepeat: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  from: Scalars['String'];
  id: Scalars['String'];
  roomId: Scalars['String'];
  to?: Maybe<Scalars['String']>;
};

export type Mindmap = {
  __typename?: 'Mindmap';
  children: Array<Mindmap>;
  id: Scalars['String'];
  parent_id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserFromChatroom: Chatroom;
  createChatroom: Chatroom;
  createMessage: Message;
  createMindmap: Mindmap;
  createUser: User;
  deleteUser: User;
  login: Auth;
  removeChatroom: Chatroom;
  removeMessage: Message;
  removeMindmap: Mindmap;
  removeUserFromChatroom: Chatroom;
  signup: Auth;
  updateChatroom: Chatroom;
  updateMessage: Message;
  updateMindmap: Mindmap;
  updateUser: User;
};


export type MutationAddUserFromChatroomArgs = {
  roomId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateChatroomArgs = {
  createChatroomInput: CreateChatroomInput;
};


export type MutationCreateMessageArgs = {
  createMessageInput: CreateMessageInput;
};


export type MutationCreateMindmapArgs = {
  createMindmapInput: CreateMindmapInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveChatroomArgs = {
  id: Scalars['String'];
};


export type MutationRemoveMessageArgs = {
  id: Scalars['String'];
};


export type MutationRemoveMindmapArgs = {
  id: Scalars['String'];
};


export type MutationRemoveUserFromChatroomArgs = {
  roomId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  passwordRepeat: Scalars['String'];
};


export type MutationUpdateChatroomArgs = {
  updateChatroomInput: UpdateChatroomInput;
};


export type MutationUpdateMessageArgs = {
  updateMessageInput: UpdateMessageInput;
};


export type MutationUpdateMindmapArgs = {
  updateMindmapInput: UpdateMindmapInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  chatroom: Chatroom;
  chatrooms: Array<Chatroom>;
  message: Message;
  messages: Array<Message>;
  mindmap: Mindmap;
  mindmaps: Array<Mindmap>;
  user: User;
  users: Array<User>;
  whoAmI: User;
};


export type QueryChatroomArgs = {
  id: Scalars['String'];
};


export type QueryMessageArgs = {
  id: Scalars['String'];
};


export type QueryMessagesArgs = {
  id: Scalars['String'];
};


export type QueryMindmapArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};


export type SubscriptionNewMessageArgs = {
  roomId: Scalars['String'];
};

export type UpdateChatroomInput = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  privateRoom?: InputMaybe<Scalars['Boolean']>;
  users: Array<Scalars['String']>;
};

export type UpdateMessageInput = {
  content?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  roomId?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
};

export type UpdateMindmapInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  parent_id?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email: Scalars['String'];
  firstname?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  lastname?: InputMaybe<Scalars['String']>;
  newPassword: Scalars['String'];
  newPasswordRepeat: Scalars['String'];
  oldPassword: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  passwordRepeat?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  chatroom?: Maybe<Chatroom>;
  deleted: Scalars['Boolean'];
  email: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastname?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  role: UserRole;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type MessagesQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', content: string, from: string, to?: string | null, roomId: string }> };

export type ChatroomsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatroomsQuery = { __typename?: 'Query', chatrooms: Array<{ __typename?: 'Chatroom', id: string, name: string, type: ChatroomType, users: Array<{ __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null, email: string }> }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null, email: string }> };

export type ChatroomQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ChatroomQuery = { __typename?: 'Query', chatroom: { __typename?: 'Chatroom', id: string, name: string, type: ChatroomType, users: Array<{ __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null, email: string }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', token: string } };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  passwordRepeat: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'Auth', token: string } };

export type UpdateRoomMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
  users: Array<Scalars['String']> | Scalars['String'];
  privateRoom: Scalars['Boolean'];
}>;


export type UpdateRoomMutation = { __typename?: 'Mutation', updateChatroom: { __typename?: 'Chatroom', id: string, name: string, type: ChatroomType, users: Array<{ __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null }> } };

export type CreateRoomMutationVariables = Exact<{
  name: Scalars['String'];
  users: Array<Scalars['String']> | Scalars['String'];
  privateRoom: Scalars['Boolean'];
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createChatroom: { __typename?: 'Chatroom', id: string, name: string, type: ChatroomType, users: Array<{ __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null }> } };

export type DeleteChatroomMutationVariables = Exact<{
  roomId: Scalars['String'];
}>;


export type DeleteChatroomMutation = { __typename?: 'Mutation', removeChatroom: { __typename?: 'Chatroom', id: string } };

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = { __typename?: 'Query', whoAmI: { __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null, email: string, role: UserRole } };

export type NewMessageSubscriptionVariables = Exact<{
  roomId: Scalars['String'];
}>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', content: string, from: string, roomId: string, to?: string | null } };

export type CreateMessageMutationVariables = Exact<{
  content: Scalars['String'];
  from: Scalars['String'];
  roomId: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', content: string, from: string, to?: string | null, roomId: string } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
  newPasswordRepeat: Scalars['String'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', email: string, firstname?: string | null, lastname?: string | null } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', deleted: boolean } };

export const MessagesDocument = gql`
    query Messages($id: String!) {
  messages(id: $id) {
    content
    from
    to
    roomId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MessagesGQL extends Apollo.Query<MessagesQuery, MessagesQueryVariables> {
    override document = MessagesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ChatroomsDocument = gql`
    query Chatrooms {
  chatrooms {
    id
    name
    type
    users {
      id
      firstname
      lastname
      email
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ChatroomsGQL extends Apollo.Query<ChatroomsQuery, ChatroomsQueryVariables> {
    override document = ChatroomsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UsersDocument = gql`
    query users {
  users {
    id
    firstname
    lastname
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
    override document = UsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ChatroomDocument = gql`
    query Chatroom($id: String!) {
  chatroom(id: $id) {
    id
    name
    type
    users {
      id
      firstname
      lastname
      email
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ChatroomGQL extends Apollo.Query<ChatroomQuery, ChatroomQueryVariables> {
    override document = ChatroomDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    override document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SignupDocument = gql`
    mutation signup($email: String!, $password: String!, $firstname: String = "", $lastname: String = "", $passwordRepeat: String!) {
  signup(
    firstname: $firstname
    lastname: $lastname
    email: $email
    password: $password
    passwordRepeat: $passwordRepeat
  ) {
    token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SignupGQL extends Apollo.Mutation<SignupMutation, SignupMutationVariables> {
    override document = SignupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateRoomDocument = gql`
    mutation updateRoom($id: String!, $name: String!, $users: [String!]!, $privateRoom: Boolean!) {
  updateChatroom(
    updateChatroomInput: {id: $id, name: $name, privateRoom: $privateRoom, users: $users}
  ) {
    id
    name
    type
    users {
      id
      firstname
      lastname
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateRoomGQL extends Apollo.Mutation<UpdateRoomMutation, UpdateRoomMutationVariables> {
    override document = UpdateRoomDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateRoomDocument = gql`
    mutation createRoom($name: String!, $users: [String!]!, $privateRoom: Boolean!) {
  createChatroom(
    createChatroomInput: {name: $name, privateRoom: $privateRoom, users: $users}
  ) {
    id
    name
    type
    users {
      id
      firstname
      lastname
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateRoomGQL extends Apollo.Mutation<CreateRoomMutation, CreateRoomMutationVariables> {
    override document = CreateRoomDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteChatroomDocument = gql`
    mutation deleteChatroom($roomId: String!) {
  removeChatroom(id: $roomId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteChatroomGQL extends Apollo.Mutation<DeleteChatroomMutation, DeleteChatroomMutationVariables> {
    override document = DeleteChatroomDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const WhoAmIDocument = gql`
    query whoAmI {
  whoAmI {
    id
    firstname
    lastname
    email
    role
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class WhoAmIGQL extends Apollo.Query<WhoAmIQuery, WhoAmIQueryVariables> {
    override document = WhoAmIDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const NewMessageDocument = gql`
    subscription newMessage($roomId: String!) {
  newMessage(roomId: $roomId) {
    content
    from
    roomId
    to
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class NewMessageGQL extends Apollo.Subscription<NewMessageSubscription, NewMessageSubscriptionVariables> {
    override document = NewMessageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateMessageDocument = gql`
    mutation createMessage($content: String!, $from: String!, $roomId: String!) {
  createMessage(
    createMessageInput: {content: $content, from: $from, roomId: $roomId}
  ) {
    content
    from
    to
    roomId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateMessageGQL extends Apollo.Mutation<CreateMessageMutation, CreateMessageMutationVariables> {
    override document = CreateMessageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateUserDocument = gql`
    mutation updateUser($id: String!, $firstname: String!, $lastname: String!, $email: String!, $oldPassword: String!, $newPassword: String!, $newPasswordRepeat: String!) {
  updateUser(
    updateUserInput: {id: $id, firstname: $firstname, lastname: $lastname, email: $email, oldPassword: $oldPassword, newPassword: $newPassword, newPasswordRepeat: $newPasswordRepeat}
  ) {
    email
    firstname
    lastname
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    override document = UpdateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteUserDocument = gql`
    mutation deleteUser($id: String!) {
  deleteUser(id: $id) {
    deleted
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteUserGQL extends Apollo.Mutation<DeleteUserMutation, DeleteUserMutationVariables> {
    override document = DeleteUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }