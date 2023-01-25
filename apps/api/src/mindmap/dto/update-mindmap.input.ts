import {CreateMindmapInput} from './create-mindmap.input';
import {Field, InputType, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateMindmapInput extends PartialType(CreateMindmapInput) {
  @Field(() => String)
  id: string;
}
