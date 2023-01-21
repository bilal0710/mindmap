import {Field, ObjectType, registerEnumType} from '@nestjs/graphql';
import {User} from "../../user/entities/user.entity";
import {Message} from "../../message/entities/message.entity";

enum ChatroomType {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

registerEnumType(ChatroomType, {
  name: 'ChatroomType',
});

@ObjectType()
export class Chatroom {
  @Field()
  id: string;

  @Field({nullable: false})
  name?: string;

  @Field({defaultValue: false})
  deleted: boolean;


  @Field(() => Message, {nullable: true})
  messages: Message[];


  @Field(() => User, {nullable: true})
  user: User[];

  @Field(() => ChatroomType, {defaultValue: ChatroomType.PUBLIC})
  role: ChatroomType;
}
