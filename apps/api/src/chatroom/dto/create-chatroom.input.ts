import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatroomInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
