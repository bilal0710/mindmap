import { Injectable } from '@nestjs/common';
import { CreateChatroomInput } from './dto/create-chatroom.input';
import { UpdateChatroomInput } from './dto/update-chatroom.input';

@Injectable()
export class ChatroomService {
  create(createChatroomInput: CreateChatroomInput) {
    return 'This action adds a new chatroom';
  }

  findAll() {
    return `This action returns all chatroom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatroom`;
  }

  update(id: number, updateChatroomInput: UpdateChatroomInput) {
    return `This action updates a #${id} chatroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatroom`;
  }
}
