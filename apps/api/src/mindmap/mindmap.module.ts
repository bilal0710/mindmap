import { Module } from '@nestjs/common';
import { MindmapService } from './mindmap.service';
import { MindmapResolver } from './mindmap.resolver';
import {PrismaService} from "../prisma/prisma.service";

@Module({
  providers: [MindmapResolver, MindmapService, PrismaService],
})
export class MindmapModule {}
