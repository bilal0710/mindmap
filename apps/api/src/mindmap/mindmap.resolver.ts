import {Resolver, Query, Mutation, Args, Int, ResolveField, Parent} from '@nestjs/graphql';
import {MindmapService} from './mindmap.service';
import {Mindmap} from './entities/mindmap.entity';
import {CreateMindmapInput} from './dto/create-mindmap.input';
import {UpdateMindmapInput} from './dto/update-mindmap.input';

@Resolver(() => Mindmap)
export class MindmapResolver {
  constructor(private readonly mindmapService: MindmapService) {
  }

  @Mutation(() => Mindmap)
  createMindmap(
    @Args('createMindmapInput') createMindmapInput: CreateMindmapInput
  ) {
    return this.mindmapService.create(createMindmapInput);
  }

  @Query(() => [Mindmap], {name: 'mindmaps'})
  findAll() {
    return this.mindmapService.findAll();
  }

  @Query(() => Mindmap, {name: 'mindmap'})
  findOne(@Args('id', {type: () => String}) id: string) {
    return this.mindmapService.findOne(id);
  }

  @ResolveField('children', () => [Mindmap])
  async getChildren(@Parent() mindmap: Mindmap) {
    return await this.mindmapService.findAllChildren(mindmap.id);
  }

  @Mutation(() => Mindmap)
  updateMindmap(
    @Args('updateMindmapInput') updateMindmapInput: UpdateMindmapInput
  ) {
    return this.mindmapService.update(
      updateMindmapInput.id,
      updateMindmapInput
    );
  }

  @Mutation(() => Mindmap)
  removeMindmap(@Args('id', {type: () => Int}) id: number) {
    return this.mindmapService.remove(id);
  }
}
