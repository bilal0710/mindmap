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
  users: Array<Scalars['String']>;
};

export type CreateMessageInput = {
  content: Scalars['String'];
  from: Scalars['String'];
  roomId: Scalars['String'];
  to: Scalars['String'];
};

export type CreateMindmapInput = {
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
  to: Scalars['String'];
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
  login: Auth;
  removeChatroom: Chatroom;
  removeMessage: Message;
  removeMindmap: Mindmap;
  removeUser: User;
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


export type MutationRemoveUserArgs = {
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


export type QueryMindmapArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type UpdateChatroomInput = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateMessageInput = {
  content?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  roomId?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
};

export type UpdateMindmapInput = {
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

export type MessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type MessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', content: string }> };

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

export const MessagesDocument = gql`
    query Messages {
  messages {
    content
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