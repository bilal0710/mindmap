import {Field, InputType} from '@nestjs/graphql';


@InputType()
export class CreateChatroomInput {
  @Field({nullable: false})
  name: string;


  @Field(() => [String], { nullable: false })
  users: string[];

  @Field({nullable: true})
  privateRoom: boolean;


}
