import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productsRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    // const newProduct = new Product();

    // newProduct.name = data.name;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    // newProduct.image = data.image;

    const newProduct = this.productsRepo.create(data);

    return this.productsRepo.save(newProduct);
  }

  async update(id: number, productChanges: UpdateProductDto) {
    const product = await this.productsRepo.findOne({ where: { id } });
    this.productsRepo.merge(product, productChanges);

    return this.productsRepo.save(product);
  }

  delete(id: number) {
    return this.productsRepo.delete(id);
  }
}
