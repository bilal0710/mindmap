import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field({nullable: false})
  email: string;

  @Field({nullable: false})
  password: string;

}
