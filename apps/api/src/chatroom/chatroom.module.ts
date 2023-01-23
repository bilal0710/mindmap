import {Module} from '@nestjs/common';
import {ChatroomService} from './chatroom.service';
import {ChatroomResolver} from './chatroom.resolver';
import {PrismaService} from "../prisma/prisma.service";
import {UserService} from "../user/user.service";

@Module({
  providers: [ChatroomResolver, ChatroomService, PrismaService, UserService],
})
export class ChatroomModule {
}
