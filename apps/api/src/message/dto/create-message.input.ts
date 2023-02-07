import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {

  @Field({nullable: false})
  content: string;

  @Field({nullable: false})
  from: string;

  @Field({nullable: true})
  to: string;

  @Field({nullable: false})
  roomId: string;
}
