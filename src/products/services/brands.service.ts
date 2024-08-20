import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandsRepo: Repository<Brand>) {}

  findAll() {
    return this.brandsRepo.find();
  }

  async findOne(id: number) {
    const product = await this.brandsRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  create(brandData: CreateBrandDto) {
    const newBrand = this.brandsRepo.create(brandData);
    this.brandsRepo.save(newBrand);
    return newBrand;
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brandsRepo.merge(brand, changes);
    return this.brandsRepo.save(brand);
  }

  async remove(id: number) {
    const brand = await this.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brandsRepo.delete(brand);
    return true;
  }
}
