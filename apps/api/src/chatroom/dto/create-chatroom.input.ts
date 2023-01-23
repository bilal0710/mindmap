import {Field, InputType, registerEnumType} from '@nestjs/graphql';
import {ChatroomType} from "../../shared/enums";

registerEnumType(ChatroomType, {
  name: 'ChatroomType',
});
@InputType()
export class CreateChatroomInput {
  @Field({nullable: false})
  name: string;


  @Field(() => [String], { nullable: false })
  users: string[];
}
