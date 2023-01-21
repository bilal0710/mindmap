import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {

  @Field({nullable: false})
  content: string;

  @Field({nullable: false})
  from: string;

  @Field({nullable: false})
  to: string;

  @Field({nullable: false})
  roomId: string;
}
