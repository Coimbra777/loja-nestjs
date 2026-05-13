import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

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

    const existingUser = await this.usersRepository.findOneBy({
      email: data.email,
    });

    if (existingUser) {
      throw new ConflictException('O e-mail informado já está em uso.');
    }

    if (!category) {
      throw new NotFoundException('Categoria não encontrada.');
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
    const users = await this.usersRepository.find({
      relations: ['category'],
    });

    return users.map((user) => {
      const responseUserDto = new ResponseUserDto();
      responseUserDto.id = user.id;
      responseUserDto.name = user.name;
      responseUserDto.email = user.email;
      responseUserDto.category = {
        name: user.category.name,
      };
      return responseUserDto;
    });
  }
}
