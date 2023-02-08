import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UserService} from './user.service';
import {User} from './entities/user.entity';
import {CreateUserInput} from './dto/create-user.input';
import {UpdateUserInput} from './dto/update-user.input';
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

  @Mutation(() => User)
  deleteUser(@Args('id', {type: () => String}) id: string,
             @CurrentUser() loggedUser: LoggedUser) {
    return this.userService.remove(id, loggedUser);
  }

  @Query(() => User, {name: 'whoAmI'})
  whoAmI(@CurrentUser() user: LoggedUser) {
    return this.userService.findOne(user.sub);
  }
}
