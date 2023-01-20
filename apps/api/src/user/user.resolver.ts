import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UserService} from './user.service';
import {User, UserRole} from './entities/user.entity';
import {CreateUserInput} from './dto/create-user.input';
import {UpdateUserInput} from './dto/update-user.input';
import {Roles} from "../auth/decorator/role.decorator";


@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Roles(UserRole.ADMIN)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }


  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: string) {
    return this.userService.remove(id);
  }
}
