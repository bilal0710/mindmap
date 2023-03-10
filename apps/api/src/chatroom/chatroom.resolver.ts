import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {ChatroomService} from './chatroom.service';
import {CreateChatroomInput} from './dto/create-chatroom.input';
import {UpdateChatroomInput} from './dto/update-chatroom.input';
import {CurrentUser} from "../auth/decorator/current-user.decorator";
import {LoggedUser} from "../shared/interfaces";
import {Chatroom} from "./entities/chatroom.entity";
import {UserService} from "../user/user.service";
import {User} from "../user/entities/user.entity";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/guards/jwt-auth-guard.service";

@Resolver(() => Chatroom)
export class ChatroomResolver {
  constructor(private readonly chatroomService: ChatroomService,
              private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Chatroom)
  createChatroom(
    @Args('createChatroomInput') createChatroomInput: CreateChatroomInput
  ) {
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
  @ResolveField('users', () => [User])
  async getChildren(@Parent() chatroom: Chatroom) {
    return await this.userService.findAllUserWithChatRoom(chatroom.id);
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
  async removeChatroom(@Args('id', { type: () => String }) id: string,
                       @CurrentUser() loggedUser: LoggedUser) {
    return this.chatroomService.remove(id, loggedUser);
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
