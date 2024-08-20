import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { BrandsService } from './brands.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepo: Repository<Product>,
    private bransService: BrandsService,
  ) {}

  findAll() {
    return this.productsRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(productData: CreateProductDto) {
    // const newProduct = new Product();

    // newProduct.name = data.name;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    // newProduct.image = data.image;

    const newProduct = this.productsRepo.create(productData);

    if (productData.brandId) {
      const brand = await this.bransService.findOne(productData.brandId);
      newProduct.brand = brand;
    } else {
      throw new BadRequestException(
        'Cannot create product because brand is not not present',
      );
    }

    this.productsRepo.save(newProduct);
    return newProduct;
  }

  async update(id: number, productChanges: UpdateProductDto) {
    const product = await this.productsRepo.findOne({ where: { id } });

    if (productChanges.brandId) {
      const brand = await this.bransService.findOne(productChanges.brandId);
      product.brand = brand;
    } else {
      throw new BadRequestException(
        'Cannot update product because brand is not not present',
      );
    }

    this.productsRepo.merge(product, productChanges);

    return this.productsRepo.save(product);
  }

  delete(id: number) {
    return this.productsRepo.delete(id);
  }
}
