import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserInput} from './dto/create-user.input';
import {UpdateUserInput} from './dto/update-user.input';
import {PrismaService} from "../prisma/prisma.service";

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


  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.prisma.user.findUnique({where: {id: id}});
    if (!user) {
      throw new HttpException({}, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
