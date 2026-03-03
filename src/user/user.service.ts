import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByUsername(username: string) {
    return await this.prismaService.user
      .findUnique({
        where: { user },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }

        delete foundedUser.password;

        return foundedUser;
      })
      .catch((error) => {
        throw new NotFoundException('Користувач був знайдений за нікнеймом.');;
      }); 
  }

  async findByEmail(email: string) {
    return await this.prismaService.user
      .findUnique({
        where: { email },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }

        delete foundedUser.password;

        return foundedUser;
      })
      .catch((error) => {
        throw new NotFoundException('Користувач був знайдений за нікнеймом.');
      });
  }
  
  async findByPhone(email: string) {
    return await this.prismaService.user
      .findUnique({
        where: { email },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }

        delete foundedUser.password;

        return foundedUser;
      })
      .catch((error) => {
        throw new NotFoundException('Користувач був знайдений за нікнеймом.');;
      });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
