import {Field, ObjectType} from '@nestjs/graphql';
import {Chatroom} from "../../chatroom/entities/chatroom.entity";


@ObjectType()
export class User {

  @Field()
  id: string;

  @Field({nullable: true})
  firstname?: string;

  @Field({nullable: true})
  lastname?: string;

  @Field({nullable: false})
  email: string;

  @Field({nullable: false})
  password: string;

  @Field({defaultValue: false})
  deleted: boolean;

  @Field(() => Chatroom, {nullable: true})
  chatroom: Chatroom[];
}
