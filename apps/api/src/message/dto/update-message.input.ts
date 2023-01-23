import {CreateMessageInput} from './create-message.input';
import {Field, InputType, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateMessageInput extends PartialType(CreateMessageInput) {
  @Field()
  id: string;
}
