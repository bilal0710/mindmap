import { CreateChatroomInput } from './create-chatroom.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChatroomInput extends PartialType(CreateChatroomInput) {
  @Field(() => Int)
  id: number;
}
