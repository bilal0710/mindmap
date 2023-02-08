import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserInput} from './dto/create-user.input';
import {UpdateUserInput} from './dto/update-user.input';
import {PrismaService} from "../prisma/prisma.service";
import {compareSync, hashSync} from "bcrypt";
import {LoggedUser} from "../shared/interfaces";

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {
  }

  async create(createUserInput: CreateUserInput) {
    return await this.prisma.user.create({data: createUserInput});
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findAllUserWithChatRoom(chatroomId?: string) {
    return await this.prisma.user.findMany({
      where: {
        chatrooms: {
          some: {
            id: chatroomId
          }
        }
      }
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {id},
    });
    if (!user) {
      throw new HttpException(`Mindmap with parent id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {email},
    });
    if (!user) {
      throw new HttpException(`User with email ${email} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    let user = await this.prisma.user.findUnique({where: {id: id}});
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!updateUserInput.oldPassword || !compareSync(updateUserInput.oldPassword, user.password)) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
    if (updateUserInput.newPassword !== updateUserInput.newPasswordRepeat) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }
    user.password = hashSync(updateUserInput.newPassword, 10);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {oldPassword, newPassword, newPasswordRepeat, ...result} = updateUserInput;
    Object.assign(user, result);
    user = await this.prisma.user.update({where: {id: id}, data: user});
    delete user.password;
    return user;
  }

  async remove(id: string, loggedUser: LoggedUser) {
    let user = await this.prisma.user.findUnique({where: {id: id}});
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (loggedUser.sub !== id && loggedUser.role !== 'admin') {
      return new HttpException('You are not allowed to remove this user', HttpStatus.FORBIDDEN);
    }
    user.deleted = true;
    user.email = 'deleted-' + user.id;
    user.firstname = '';
    user.lastname = '';
    user.password = '';
    if (!user.deleted) {
      user = await this.prisma.user.update({where: {id: id}, data: user});
    }
    delete user.password;
    return user;
  }
}
