import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateMindmapInput {

  @Field({nullable: false})
  title: string;

  @Field({nullable: true})
  parent_id: string;

  @Field({nullable: false})
  chatroom_id: string;
}
