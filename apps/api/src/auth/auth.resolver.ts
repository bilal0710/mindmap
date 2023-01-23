import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {Auth} from './entities/auth.entity';
import {Public} from "./decorator/public.decorator";

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
         @Args('lastname') lastname: string) {
    return this.authService.signup({email, password, passwordRepeat, firstname, lastname});
  }
}
