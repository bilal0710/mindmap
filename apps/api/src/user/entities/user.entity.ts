import {Field, ObjectType, registerEnumType} from "@nestjs/graphql";
import {Chatroom} from "../../chatroom/entities/chatroom.entity";
import {UserRole} from "../../shared/user-role.enum";




registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
export class User {

  @Field()
  id: string;

  @Field({nullable: true})
  firstname?: string;

  @Field({nullable: true})
  lastname?: string;

  @Field({nullable: false})
  email: string;

  @Field({nullable: false})
  password: string;

  @Field({defaultValue: false})
  deleted: boolean;


  @Field(() => UserRole, {defaultValue: UserRole.USER})
  role: UserRole;

  @Field(() => Chatroom, {nullable: true})
  chatroom: Chatroom[];
}
