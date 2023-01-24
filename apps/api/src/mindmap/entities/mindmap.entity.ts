import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class Mindmap {

  @Field()
  id: string;

  @Field({nullable: false})
  title: string;

  @Field()
  parentId: string;

  @Field(() => Mindmap, {nullable: true})
  children: Mindmap[];
}
