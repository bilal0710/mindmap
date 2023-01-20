import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {Auth} from './entities/auth.entity';
import {User} from "../user/entities/user.entity";
import {Public} from "./decorator/public.decorator";
import {CurrentUser} from "./decorator/current-user.decorator";

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }


  @Public()
  @Mutation(() => Auth)
  login(@Args('email') email: string,
        @Args('password') password: string) {
    return this.authService.login({email, password});
  }


  @Public()
  @Mutation(() => Auth)
  signup(@Args('email') email: string,
         @Args('password') password: string,
         @Args('passwordRepeat') passwordRepeat: string,
         @Args('firstname') firstname: string,
         @Args('lastname') lastname: string,) {
    return this.authService.signup({email, password, passwordRepeat, firstname, lastname});
  }

  @Public()
  @Query(() => User)
  whoAmI(@CurrentUser() user: User) {
    return this.authService.findById(user.id);
  }
}
