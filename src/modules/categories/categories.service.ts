import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(data: CreateCategoryDto) {
    const category = this.categoriesRepository.create(data);
    return this.categoriesRepository.save(category);
  }

  async findByOne(id: number) {
    return this.categoriesRepository.findOneBy({ id });
  }

  async findAll() {
    return this.categoriesRepository.find();
  }
}
