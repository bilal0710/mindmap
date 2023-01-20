import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateAuthInput {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field({nullable: false})
  email: string;

  @Field({nullable: false})
  password: string;


  @Field({nullable: false})
  passwordRepeat: string;
}
