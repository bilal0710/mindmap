import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChatroomService } from './chatroom.service';
import { Chatroom } from './entities/chatroom.entity';
import { CreateChatroomInput } from './dto/create-chatroom.input';
import { UpdateChatroomInput } from './dto/update-chatroom.input';

@Resolver(() => Chatroom)
export class ChatroomResolver {
  constructor(private readonly chatroomService: ChatroomService) {}

  @Mutation(() => Chatroom)
  createChatroom(
    @Args('createChatroomInput') createChatroomInput: CreateChatroomInput
  ) {
    return this.chatroomService.create(createChatroomInput);
  }

  @Query(() => [Chatroom], { name: 'chatroom' })
  findAll() {
    return this.chatroomService.findAll();
  }

  @Query(() => Chatroom, { name: 'chatroom' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.chatroomService.findOne(id);
  }

  @Mutation(() => Chatroom)
  updateChatroom(
    @Args('updateChatroomInput') updateChatroomInput: UpdateChatroomInput
  ) {
    return this.chatroomService.update(
      updateChatroomInput.id,
      updateChatroomInput
    );
  }

  @Mutation(() => Chatroom)
  removeChatroom(@Args('id', { type: () => Int }) id: number) {
    return this.chatroomService.remove(id);
  }
}
