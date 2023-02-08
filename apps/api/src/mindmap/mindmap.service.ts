import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateMindmapInput} from './dto/create-mindmap.input';
import {UpdateMindmapInput} from './dto/update-mindmap.input';
import {PrismaService} from "../prisma/prisma.service";
import {Mindmap} from "./entities/mindmap.entity";
import {PubSub} from "graphql-subscriptions";

@Injectable()
export class MindmapService {
  public pubSub = new PubSub();

  constructor(private prisma: PrismaService) {
  }

  async create(createMindmapInput: CreateMindmapInput) {
    if (createMindmapInput?.parent_id) {
      const mindmap = await this.prisma.mindmap.findUnique({
        where: {
          id: createMindmapInput?.parent_id
        }
      })
      if (!mindmap) {
        throw new HttpException(`Mindmap with parent id ${createMindmapInput.parent_id} not found`, HttpStatus.NOT_FOUND);
      }
    }
    return await this.prisma.mindmap.create({
      data: createMindmapInput,
    });
  }

  async createNodes(createMindmapInput: CreateMindmapInput) {
    console.log(createMindmapInput);
    const mindmap = await this.prisma.mindmap.findFirst({
      where: {
        chatroom_id: createMindmapInput.chatroom_id,
        title: createMindmapInput.nodes[0]
      }
    });
    if (mindmap) {
      const result =  await this.prisma.mindmap.update({
        where: {
          id: mindmap.id
        },
        data: {
          children: {
            create: createMindmapInput.nodes.slice(1).map(node => {
              return {
                title: node,
                chatroom_id: createMindmapInput.chatroom_id,
              }
            })
          }
        }
      });
      await this.pubSub.publish('newMindmap', {newMindmap: result});
      return result;
    }
    const result = await this.prisma.mindmap.create({
      data: {
        title: createMindmapInput.nodes[0],
        chatroom_id: createMindmapInput.chatroom_id,
        children: {
          create: createMindmapInput.nodes.slice(1).map(node => {
            return {
              title: node,
              chatroom_id: createMindmapInput.chatroom_id,
            }
          })
        }
      },
    });
    await this.pubSub.publish('newMindmap', {newMindmap: result});
    return result;
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
  async findAllChildren(parent_id?: string) {
    return <Mindmap[]>await this.prisma.$queryRaw`
    WITH RECURSIVE mindmap_tree AS (
    SELECT id, title, parent_id, chatroom_id
    FROM "Mindmap"
    WHERE parent_id = ${parent_id}
    UNION ALL
    SELECT c.id, c.title, c.parent_id, c.chatroom_id
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
    const mindmap = await this.prisma.mindmap.findUnique({where: {id}})
    if (!mindmap) {
      throw new HttpException(`Mindmap with parent id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return mindmap;
  }

  async update(id: string, updateMindmapInput: UpdateMindmapInput) {
    const mindmap = await this.prisma.mindmap.findUnique({where: {id}});
    if (!mindmap) {
      throw new HttpException(`Mindmap with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return this.prisma.mindmap.update({
      where: {id},
      data: {
        title: updateMindmapInput.title,
      }
    });
  }

  async remove(id: string) {
    const mindmap = await this.prisma.mindmap.findUnique({where: {id}});
    const children = await this.findAllChildren(id);
    if (!mindmap) {
      //throw new GraphQLError(`Mindmap with id ${id} not found`);
      throw new HttpException(`Mindmap with id ${id} not found`, HttpStatus.NOT_FOUND);

    }
    if (children.length <= 0) {
      return await this.prisma.mindmap.delete({where: {id}});
    }
    if (mindmap?.parent_id === null) {
      for (const child of children) {
        if (child.parent_id === id) {
          await this.prisma.mindmap.update({
            where: {id: child.id},
            data: {
              parent_id: null
            }
          });
        }
      }
    }
    return this.prisma.mindmap.delete({where: {id}});
  }
}
