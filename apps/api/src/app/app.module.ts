import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PrismaModule} from "../prisma/prisma.module";

import {join} from "path";
import {UserModule} from "../user/user.module";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {AuthModule} from "../auth/auth.module";
import {JwtAuthGuard} from "../auth/guards/jwt-auth-guard.service";
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "../auth/guards/roles.guard";
import {MessageModule} from "../message/message.module";
import {ChatroomModule} from "../chatroom/chatroom.module";

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
    }),
    UserModule,
    AuthModule,
    MessageModule,
    ChatroomModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {provide: 'APP_GUARD', useClass: JwtAuthGuard},
    {provide: APP_GUARD, useClass: RolesGuard}],

})

export class AppModule {
}
