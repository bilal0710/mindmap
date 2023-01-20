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

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {provide: 'APP_GUARD', useClass: JwtAuthGuard}],
})
export class AppModule {
}
