import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ChatroomService} from './chatroom.service';
import {CreateChatroomInput} from './dto/create-chatroom.input';
import {UpdateChatroomInput} from './dto/update-chatroom.input';
import {Roles} from "../auth/decorator/role.decorator";
import {UserRole} from "../shared/enums";
import {CurrentUser} from "../auth/decorator/current-user.decorator";
import {LoggedUser} from "../shared/interfaces";
import {Chatroom} from "./entities/chatroom.entity";

@Resolver(() => Chatroom)
export class ChatroomResolver {
  constructor(private readonly chatroomService: ChatroomService) {}

  @Mutation(() => Chatroom)
  createChatroom(
    @Args('createChatroomInput') createChatroomInput: CreateChatroomInput
  ) {
    console.log('createChatroomInput', createChatroomInput);
    return this.chatroomService.create(createChatroomInput);
  }

  @Query(() => [Chatroom], { name: 'chatrooms' })
  findAll() {
    return this.chatroomService.findAll();
  }

  @Query(() => Chatroom, { name: 'chatroom' })
  findOne(@Args('id', { type: () => String }) id: string) {
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

  @Roles(UserRole.ADMIN)
  @Mutation(() => Chatroom)
  async removeChatroom(@Args('id', { type: () => String }) id: string) {
    return this.chatroomService.remove(id);
  }

  @Mutation(() => Chatroom)
  async removeUserFromChatroom(@Args('userId', { type: () => String }) userId: string,
                               @Args('roomId', { type: () => String }) roomId: string,
                               @CurrentUser() loggedUser: LoggedUser) {
    return this.chatroomService.removeUserFromChatroom(userId, roomId, loggedUser);
  }

  @Mutation(() => Chatroom)
  async addUserFromChatroom(@Args('userId', { type: () => String }) userId: string,
                               @Args('roomId', { type: () => String }) roomId: string) {
    return this.chatroomService.addUserFromChatroom(userId, roomId);
  }
}
