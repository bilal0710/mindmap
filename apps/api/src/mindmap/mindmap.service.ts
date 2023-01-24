import {Injectable} from '@nestjs/common';
import {CreateMindmapInput} from './dto/create-mindmap.input';
import {UpdateMindmapInput} from './dto/update-mindmap.input';
import {PrismaService} from "../prisma/prisma.service";

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
    // const children = await this.prisma.mindmap.findMany({
    //   where: {
    //     parentId: parentId
    //   }
    // });
    return await this.prisma.$queryRaw`
    WITH RECURSIVE mindmap_tree AS (
    SELECT id, title, parent_Id
    FROM "Mindmap"
    WHERE id = ${parentId}
    UNION ALL
    SELECT c.id, c.title, c.parent_Id
    FROM "Mindmap" c
    INNER JOIN mindmap_tree ct ON ct.id = c.parent_id
)
    SELECT DISTINCT *
    FROM mindmap_tree
    ORDER BY title;`;
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
