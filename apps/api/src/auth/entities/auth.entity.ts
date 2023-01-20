import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => String, { description: 'Generated access_token of the user' })
  token: string;

}
