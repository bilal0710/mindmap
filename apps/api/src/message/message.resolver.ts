import {Args, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import {MessageService} from './message.service';
import {Message} from './entities/message.entity';
import {CreateMessageInput} from './dto/create-message.input';
import {UpdateMessageInput} from './dto/update-message.input';
import {CurrentUser} from "../auth/decorator/current-user.decorator";
import {LoggedUser} from "../shared/interfaces";
import {PubSub} from "graphql-subscriptions";
import {Public} from "../auth/decorator/public.decorator";

const pubSub = new PubSub();

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {
  }

  @Mutation(() => Message)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput
  ) {
    return this.messageService.create(createMessageInput).then((data) => {
      pubSub.publish('newMessage', {newMessage: data});
      return data;
    });

  }

  @Query(() => [Message], {name: 'messages'})
  findAll(@Args('id', {type: () => String}) id: string) {
    return this.messageService.findAll(id);
  }

  @Query(() => Message, {name: 'message'})
  findOne(@Args('id', {type: () => String}) id: string) {
    return this.messageService.findOne(id);
  }

  @Mutation(() => Message)
  updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput
  ) {
    return this.messageService.update(
      updateMessageInput.id,
      updateMessageInput
    );
  }

  @Mutation(() => Message)
  removeMessage(@Args('id', {type: () => String}) id: string,
                @CurrentUser() loggedUser: LoggedUser) {
    return this.messageService.remove(id, loggedUser);
  }

  @Public()
  @Subscription(() => Message, {
    filter: (payload, variables) => payload.newMessage.roomId === variables.roomId
  })
  newMessage(@Args('roomId') roomId: string) {
    return pubSub.asyncIterator('newMessage');
  }
}
