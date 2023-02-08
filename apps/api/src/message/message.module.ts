import {Module} from '@nestjs/common';
import {MessageService} from './message.service';
import {MessageResolver} from './message.resolver';
import {PrismaService} from "../prisma/prisma.service";
import {MindmapService} from "../mindmap/mindmap.service";

@Module({
  providers: [MessageResolver, MessageService,
    PrismaService, MindmapService],
})
export class MessageModule {
}
