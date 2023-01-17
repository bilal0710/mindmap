import {Field, ObjectType} from '@nestjs/graphql';
import {Chatroom} from "../../chatroom/entities/chatroom.entity";


@ObjectType()
export class User {

  @Field()
  id: string;

  @Field({nullable: true})
  firstName?: string;

  @Field({nullable: true})
  lastName?: string;

  @Field({nullable: false})
  email: string;

  @Field({nullable: false})
  password: string;

  @Field({defaultValue: false})
  deleted: boolean;

  @Field(() => Chatroom, {nullable: true})
  chatroom: Chatroom[];
}
