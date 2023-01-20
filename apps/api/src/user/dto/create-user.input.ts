import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

  @Field({nullable: false})
  firstname: string;

  @Field({nullable: false})
  lastname: string;

  @Field({nullable: false})
  email: string;

  @Field({nullable: false})
  password: string;


  @Field({nullable: false})
  passwordRepeat: string;

}
