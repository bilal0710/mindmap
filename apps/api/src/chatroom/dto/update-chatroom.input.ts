import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UpdateChatroomInput {
  @Field(() => String)
  id: string;

  @Field({nullable: true})
  name: string;

}
