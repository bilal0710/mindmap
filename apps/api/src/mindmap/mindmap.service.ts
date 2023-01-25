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

  /*
    Raw Query: This query uses a recursive CTE to first select the top-level mindmap (where the parentId is the Id from parent node),
    and then select all the children of those map by joining the mindmap_tree CTE with the Mindmap table on the parentId.
    The result is a flattened list of all the miondmaps and their children.
 * */

  /*
    https://www.geeksforgeeks.org/mysql-recursive-cte-common-table-expressions/
    A recursive CTE is a subquery which refer to itself using its own name. The recursive CTEs are defined using WITH RECURSIVE clause.
    There should be a terminating condition to recursive CTE.
    The recursive CTEs are used for series generation and traversal of hierarchical or tree-structured data.
  * */
  async findAllChildren(parentId?: string) {
    return <Mindmap[]>await this.prisma.$queryRaw`
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
 /*
 *  I threw the distinct in there because there were duplicates in the result set
 *  but I think that's due to having a duplicate in the sample data.
 *  one cans get rid of it
 * */
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
