import { CreateMindmapInput } from './create-mindmap.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMindmapInput extends PartialType(CreateMindmapInput) {
  @Field(() => Int)
  id: number;
}
