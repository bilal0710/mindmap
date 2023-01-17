import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {User} from "@prisma/client";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getData(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
}
