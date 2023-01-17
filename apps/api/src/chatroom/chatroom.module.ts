import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomResolver } from './chatroom.resolver';

@Module({
  providers: [ChatroomResolver, ChatroomService],
})
export class ChatroomModule {}
