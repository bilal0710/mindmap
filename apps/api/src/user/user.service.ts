import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserInput} from './dto/create-user.input';
import {UpdateUserInput} from './dto/update-user.input';
import {PrismaService} from "../prisma/prisma.service";
import {compareSync, hashSync} from "bcrypt";

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {
  }

  async create(createUserInput: CreateUserInput) {
    return await this.prisma.user.create({data: createUserInput});
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {id},
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {email},
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    let user = await this.prisma.user.findUnique({where: {id: id}});
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!updateUserInput.oldPassword || !compareSync(updateUserInput.oldPassword, user.password)) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
    if (updateUserInput.newPassword !== updateUserInput.newPasswordRepeat) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }
    user.password = hashSync(updateUserInput.newPassword, 10);

    const {oldPassword, newPassword, newPasswordRepeat, ...result} = updateUserInput;
    Object.assign(user, result);
    user = await this.prisma.user.update({where: {id: id}, data: user});
    delete user.password;
    return user;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
