import {Injectable} from '@nestjs/common';
import {CreateMindmapInput} from './dto/create-mindmap.input';
import {UpdateMindmapInput} from './dto/update-mindmap.input';
import {PrismaService} from "../prisma/prisma.service";
import {Mindmap} from "./entities/mindmap.entity";

@Injectable()
export class MindmapService {
  constructor(private prisma: PrismaService) {
  }

  create(createMindmapInput: CreateMindmapInput) {
    return 'This action adds a new mindmap';
  }

  async findAll() {
    return await this.prisma.mindmap.findMany()
  }

  async findAllChildren(parentId?: string) {
    return <Mindmap[]> await this.prisma.$queryRaw`
    WITH RECURSIVE mindmap_tree AS (
    SELECT id, title, parent_id
    FROM "Mindmap"
    WHERE parent_id = ${parentId}
    UNION ALL
    SELECT c.id, c.title, c.parent_id
    FROM "Mindmap" c
    INNER JOIN mindmap_tree ct ON ct.id = c.parent_Id
)
    SELECT DISTINCT *
    FROM mindmap_tree;`;
  }

  async findOne(id: string) {
    return await this.prisma.mindmap.findUnique({where: {id}})
  }

  update(id: number, updateMindmapInput: UpdateMindmapInput) {
    return `This action updates a #${id} mindmap`;
  }

  remove(id: number) {
    return `This action removes a #${id} mindmap`;
  }
}
