import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Chatroom {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
