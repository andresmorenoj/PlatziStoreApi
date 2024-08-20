import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoriesRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoriesRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(categoryData: CreateCategoryDto) {
    const newCategory = this.categoriesRepo.create(categoryData);
    this.categoriesRepo.save(newCategory);
    return newCategory;
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categoriesRepo.merge(category, changes);
    this.categoriesRepo.save(category);
    return category;
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categoriesRepo.delete(category);
    return true;
  }
}
