import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateMessageInput} from './dto/create-message.input';
import {UpdateMessageInput} from './dto/update-message.input';
import {PrismaService} from "../prisma/prisma.service";

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
    return await this.prisma.message.findUnique({where: {id}});
  }

  async update(id: string, updateMessageInput: UpdateMessageInput) {
    const message = await this.prisma.message.findUnique({where: {id}});
    if (!message) {
      throw new HttpException('Message not found', HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.message.update({where: {id}, data: updateMessageInput});
  }

  async remove(id: string) {
    const message = await this.prisma.message.findUnique({where: {id}});
    if (!message) {
      throw new HttpException('Message not found', HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.message.delete({where: {id}});
  }
}
