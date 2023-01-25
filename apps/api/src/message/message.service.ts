import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateMessageInput} from './dto/create-message.input';
import {UpdateMessageInput} from './dto/update-message.input';
import {PrismaService} from "../prisma/prisma.service";
import {LoggedUser} from "../shared/interfaces";

@Injectable()
export class MessageService {

  constructor(private prisma: PrismaService) {
  }

  async create(createMessageInput: CreateMessageInput) {
    return await this.prisma.message.create({data: createMessageInput});
  }

  async findAll() {
    return await this.prisma.message.findMany();
  }

  async findOne(id: string) {
    const message =  await this.prisma.message.findUnique({where: {id}});
    if (!message) {
      throw new HttpException('Message not found', HttpStatus.BAD_REQUEST);
    }
    return message;
  }

  async update(id: string, updateMessageInput: UpdateMessageInput) {
    const message = await this.prisma.message.findUnique({where: {id}});
    if (!message) {
      throw new HttpException('Message not found', HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.message.update({where: {id}, data: updateMessageInput});
  }

  async remove(id: string, loggedUser: LoggedUser) {
    const message = await this.prisma.message.findUnique({where: {id}});
    if (!message) {
      throw new HttpException('Message not found', HttpStatus.BAD_REQUEST);
    }
    if(loggedUser.sub !== message.from || loggedUser.role !== 'admin') {
      return new HttpException('You are not allowed to remove this message', HttpStatus.FORBIDDEN);
    }
    return await this.prisma.message.delete({where: {id}});
  }
}
