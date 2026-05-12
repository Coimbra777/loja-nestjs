import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(data: CreateUserDto) {
    const category = await this.categoriesRepository.findOneBy({
      id: data.categoryId,
    });

    if (!category) {
      throw new Error('Category not found');
    }

    const user = this.usersRepository.create({
      name: data.name,
      email: data.email,
      password: data.password,
      category,
    });

    return this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }
}
