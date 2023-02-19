import {Module} from '@nestjs/common';
import {MessageService} from './message.service';
import {MessageResolver} from './message.resolver';
import {PrismaService} from "../prisma/prisma.service";
import {MindmapService} from "../mindmap/mindmap.service";
import {MindmapResolver} from "../mindmap/mindmap.resolver";

@Module({
  providers: [MessageResolver, MessageService,
    PrismaService, MindmapService, MindmapResolver],
})
export class MessageModule {
}
