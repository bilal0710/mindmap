import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UserService} from './user.service';
import {User} from './entities/user.entity';
import {CreateUserInput} from './dto/create-user.input';
import {UpdateUserInput} from './dto/update-user.input';
import {Roles} from "../auth/decorator/role.decorator";
import {UserRole} from "../shared/enums";
import {CurrentUser} from "../auth/decorator/current-user.decorator";
import {LoggedUser} from "../shared/interfaces";


@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Roles(UserRole.ADMIN)
  @Query(() => [User], {name: 'users'})
  findAll() {
    return this.userService.findAll();
  }


  @Query(() => User, {name: 'user'})
  findOne(@Args('id', {type: () => String}) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => User)
  removeUser(@Args('id', {type: () => String}) id: string) {
    return this.userService.remove(id);
  }


  @Query(() => User, {name: 'whoAmI'})
  whoAmI(@CurrentUser() user: LoggedUser) {
    return this.userService.findOne(user.sub);
  }
}
