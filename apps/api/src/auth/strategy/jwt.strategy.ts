import {Injectable} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";
import {environment} from "../../environments/environment";
import {Auth} from "../entities/auth.entity";
import {PassportStrategy} from "@nestjs/passport";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.auth.jwt.secret,
    });
  }

  async validate(payload: Auth) {
    return payload;
  }
}
