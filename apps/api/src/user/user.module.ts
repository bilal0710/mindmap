import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserResolver} from './user.resolver';
import {PrismaService} from "../prisma/prisma.service";
import {RolesGuard} from "../auth/guards/roles.guard";
import {APP_GUARD} from "@nestjs/core";

@Module({
  providers: [UserResolver, UserService, PrismaService,  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
  exports: [UserService],
})
export class UserModule {
}
