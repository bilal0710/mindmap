import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMindmapInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
