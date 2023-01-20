import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {Auth} from './entities/auth.entity';
import {LoginInput} from "./dto/login.input";
import {Public} from "./public.decorator";
import {CurrentUser} from "./current-user.decorator";
import {User} from "../user/entities/user.entity";
import {CreateAuthInput} from "./dto/create-auth.input";

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}


  @Public()
  @Mutation(() => Auth)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }


  @Public()
  @Mutation(() => Auth)
  signup(@Args('signupInput') signupInput: CreateAuthInput) {
    return this.authService.signup(signupInput);
  }

  @Public()
  @Query(() => User)
  whoAmI(@CurrentUser() user: User) {
    return this.authService.findById(user.id);
  }
}
