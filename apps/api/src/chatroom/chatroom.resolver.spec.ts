import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomResolver } from './chatroom.resolver';
import { ChatroomService } from './chatroom.service';

describe('ChatroomResolver', () => {
  let resolver: ChatroomResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatroomResolver, ChatroomService],
    }).compile();

    resolver = module.get<ChatroomResolver>(ChatroomResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
