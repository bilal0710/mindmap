import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {MessageService} from './message.service';
import {Message} from './entities/message.entity';
import {CreateMessageInput} from './dto/create-message.input';
import {UpdateMessageInput} from './dto/update-message.input';
import {CurrentUser} from "../auth/decorator/current-user.decorator";
import {LoggedUser} from "../shared/interfaces";

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput
  ) {
    return this.messageService.create(createMessageInput);
  }

  @Query(() => [Message], { name: 'messages' })
  findAll() {
    return this.messageService.findAll();
  }

  @Query(() => Message, { name: 'message' })
  findOne(@Args('id', { type: () => String }) id: string) {
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
  removeMessage(@Args('id', { type: () => String }) id: string,
                @CurrentUser() loggedUser: LoggedUser) {
    return this.messageService.remove(id, loggedUser);
  }
}
