import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field()
  id: string;

  @Field({nullable: false})
  content: string;

  @Field({nullable: false})
  from: string;

  @Field({nullable: true})
  to: string;

  @Field({nullable: false})
  roomId: string;
}
