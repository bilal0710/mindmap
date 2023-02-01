import {ChatroomType} from "../graphql/generated";

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface ChatroomItem {
  __typename?: 'Chatroom',
  name: string,
  type: ChatroomType
}
