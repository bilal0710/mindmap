import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthResolver} from './auth.resolver';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {environment} from "../environments/environment";
import {JwtStrategy} from "./strategy/jwt.strategy";

@Module({
  imports: [UserModule,
    JwtModule.register({
      secret: environment.auth.jwt.secret,
      // TODO: this should be set to 60s and the token should be refreshed
      signOptions: {expiresIn: '30d'},
    })],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
}
