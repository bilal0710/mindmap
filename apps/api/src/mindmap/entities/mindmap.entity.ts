import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class Mindmap {

  @Field()
  id: string;

  @Field({nullable: false})
  title: string;

  @Field({nullable: true})
  parent_id: string;

  @Field(() => Mindmap, {nullable: true})
  children: Mindmap[];

  @Field({nullable: true})
  chatroom_id: string;
}
