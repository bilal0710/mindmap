import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateMessageInput} from './dto/create-message.input';
import {UpdateMessageInput} from './dto/update-message.input';
import {PrismaService} from "../prisma/prisma.service";
import {LoggedUser} from "../shared/interfaces";
import {MindmapResolver} from "../mindmap/mindmap.resolver";

@Injectable()
export class MessageService {

  constructor(private prisma: PrismaService,
              private mindmapResolver: MindmapResolver) {
  }

  splitMessage(message: string): string[] {
    const result: string[] = []
    message = message.substring(message.indexOf('#'));
    const node = message.split(' ');
    if (node.length > 0) {
      node.forEach((n) => {
        if (n.includes('#')) {
          n = n.substring(n.indexOf('#') + 1).trim();
          if (n !== '') {
            result.push(n);
          }
        }
      });
      return result;
    }
    return [];
  }

  async create(createMessageInput: CreateMessageInput) {
    const message = await this.prisma.message.create({data: createMessageInput});
    const nodes = this.splitMessage(message.content);

    if (nodes.length > 0) {



      await this.mindmapResolver.createMindmaps({
        title: null,
        parent_id: null,
        chatroom_id: message.roomId,
        nodes: nodes
      });
    }
    return message;
  }

  async findAll(id: string) {
    return await this.prisma.message.findMany({where: {roomId: id}});
  }

  async findOne(id: string) {
    const message = await this.prisma.message.findUnique({where: {id}});
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
    if (loggedUser.sub !== message.from || loggedUser.role !== 'admin') {
      return new HttpException('You are not allowed to remove this message', HttpStatus.FORBIDDEN);
    }
    return await this.prisma.message.delete({where: {id}});
  }
}
