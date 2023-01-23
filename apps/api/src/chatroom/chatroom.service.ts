import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateChatroomInput} from './dto/create-chatroom.input';
import {UpdateChatroomInput} from './dto/update-chatroom.input';
import {PrismaService} from "../prisma/prisma.service";
import {LoggedUser} from "../shared/interfaces";

@Injectable()
export class ChatroomService {

  constructor(private prisma: PrismaService) {
  }

  async create(createChatroomInput: CreateChatroomInput) {
    return await this.prisma.chatroom.create({
      data: {
        name: createChatroomInput.name,
        users: {
          connect: createChatroomInput.users.map(id => {
            return {id: id}
          })
        },
      }
    });
  }

  async findAll() {
    return await this.prisma.chatroom.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.chatroom.findUnique({where: {id}, include: {users: true}});

  }

  async update(id: string, updateChatroomInput: UpdateChatroomInput) {
    return await this.prisma.chatroom.update({
      where: {id},
      data: updateChatroomInput,
    });
  }


  async remove(id: string) {
    const chatroom = await this.prisma.chatroom.findUnique({where: {id}, include: {users: true}});
    if (chatroom?.users.length > 0) {
      throw new Error('Chatroom has users');
    }
    return await this.prisma.chatroom.delete({where: {id}})
  }

  async removeUserFromChatroom(userId: string, roomId:string, loggedUser: LoggedUser) {
    const chatroom = await this.prisma.chatroom.findUnique({where: {id: roomId}});
    const user = await this.prisma.user.findUnique({where: {id: userId}});

    if (!chatroom || !user) {
      throw new HttpException('User or room not found', HttpStatus.NOT_FOUND);
    }
    if(loggedUser.sub !== userId || loggedUser.role !== 'admin') {
      return new HttpException('You are not allowed to remove this user from chat', HttpStatus.FORBIDDEN);
    }
    return await this.prisma.chatroom.update({
      where: {id: roomId},
      data: {
        users: {
          disconnect: {
            id: userId
          }
        }
      },
      include: {users: true}
    });
  }

  async addUserFromChatroom(userId: string, roomId:string) {
    const chatroom = await this.prisma.chatroom.findUnique({where: {id: roomId}});
    const user = await this.prisma.user.findUnique({where: {id: userId}});
    if (!chatroom || !user) {
      throw new HttpException('User or room not found', HttpStatus.NOT_FOUND);
    }
    return  await this.prisma.chatroom.update({
      where: {id: roomId},
      data: {
        users: {
          connect: {
            id: userId
          }
        }
      },
      include: {users: true}
    });
  }
}
