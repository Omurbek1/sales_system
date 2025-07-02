import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  findByLogin(login: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { login } });
  }

  findById(id: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  async create(data: Partial<User> & { password?: string }): Promise<User> {
    const { name, login, password, passwordHash, role } = data;

    if (!name || !login || (!passwordHash && !password)) {
      throw new Error('Password is required');
    }

    const hash: string =
      passwordHash || (await bcrypt.hash(password as string, 10));

    const existingUser = await this.usersRepo.findOne({ where: { login } });
    if (existingUser) {
      throw new BadRequestException(
        `Пользователь с логином "${login}" уже существует`,
      );
    }

    const user = this.usersRepo.create({
      name,
      login,
      passwordHash: hash,
      role: role || 'manager',
    });

    return this.usersRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  update(id: string, userData: Partial<User>): Promise<User> {
    return this.usersRepo.save({ id, ...userData });
  }
  delete(id: string): Promise<void> {
    return this.usersRepo.delete(id).then(() => {});
  }
}
