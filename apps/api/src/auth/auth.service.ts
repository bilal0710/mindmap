import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {compareSync, hashSync} from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {CreateAuthInput} from "./dto/create-auth.input";
import {LoginInput} from "./dto/login.input";
import {Auth} from "./entities/auth.entity";
import {User} from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
              private jwtService: JwtService) {
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && compareSync(pass, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async generateUserCredentials(user: User): Promise<Auth> {
    const payload = {email: user.email, sub: user.id, role: user.role};

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async login(loginUserInput: LoginInput) {
    const user = await this.validateUser(
      loginUserInput.email,
      loginUserInput.password,
    );
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    } else {
      return this.generateUserCredentials(user);
    }
  }

  async signup(userInput: CreateAuthInput): Promise<Auth> {
    if (userInput.password !== userInput.passwordRepeat) {
      throw new HttpException(
        'ERROR_PASSWORDS_NOT_MATCHING',
        HttpStatus.BAD_REQUEST
      );
    }
    delete userInput.passwordRepeat;
    userInput.password = hashSync(userInput.password, 10);

    const user = await this.usersService.create(userInput);

    return this.generateUserCredentials(user);
  }

  async findById(id: string) {
    return await this.usersService.findOne(id);
  }
}
