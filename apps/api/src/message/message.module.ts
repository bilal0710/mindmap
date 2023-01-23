import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import {PrismaService} from "../prisma/prisma.service";

@Module({
  providers: [MessageResolver, MessageService, PrismaService],
})
export class MessageModule {}
