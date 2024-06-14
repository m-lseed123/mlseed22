import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../models/users/dtos/create-user.dto';
import { UserCreatedDto } from '../models/users/dtos/user-created.dto';
import { User } from '@app/common/db/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(payload: CreateUserDto): Promise<UserCreatedDto> {
    const user = this.usersRepository.create(payload);
    const created = await this.usersRepository.save(user);

    return created;
  }

  async exists(email: string): Promise<boolean> {
    return await this.usersRepository.exists({ where: { email } });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async getById(userId: string): Promise<UserCreatedDto | null> {
    const user = await this.usersRepository.findOne({ where: { userId } });

    if (!user) {
      return null;
    }

    return user;
  }

  async findUser(
    email: string,
  ): Promise<(UserCreatedDto & { password: string }) | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: {
        userId: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
