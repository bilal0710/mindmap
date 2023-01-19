import {CreateUserInput} from './create-user.input';
import {Field, InputType, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: string;

  @Field({nullable: true})
  firstname: string;

  @Field({nullable: true})
  lastname: string;

  @Field({nullable: false})
  email: string;

  @Field({nullable: false})
  oldPassword: string;

  @Field({nullable: false})
  newPassword: string;

  @Field({nullable: false})
  newPasswordRepeat: string;
}
