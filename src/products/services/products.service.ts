import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, Between, FindOptionsWhere } from 'typeorm';

import { Product } from '../entities/product.entity';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { Category } from 'products/entities/category.entity';
import { Brand } from 'products/entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepo: Repository<Product>,
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
    @InjectRepository(Brand) private brandsRepo: Repository<Brand>,
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      console.log({params});

      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productsRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productsRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });
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
      const brand = await this.brandsRepo.findOne({
        where: { id: productData.brandId },
      });
      newProduct.brand = brand;
    } else {
      throw new BadRequestException(
        'Cannot create product because brand is not not present',
      );
    }

    if (productData.categoriesIds) {
      const categories = await this.categoriesRepo.findBy({
        id: In(productData.categoriesIds),
      });

      newProduct.categories = categories;
    }

    this.productsRepo.save(newProduct);
    return newProduct;
  }

  async update(id: number, productChanges: UpdateProductDto) {
    const product = await this.productsRepo.findOne({ where: { id } });

    if (productChanges.brandId) {
      const brand = await this.brandsRepo.findOne({
        where: { id: productChanges.brandId },
      });
      product.brand = brand;
    }

    if (productChanges.categoriesIds) {
      const categories = await this.categoriesRepo.findBy({
        id: In(productChanges.categoriesIds),
      });

      product.categories = categories;
    }

    this.productsRepo.merge(product, productChanges);

    return this.productsRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    console.log('entra service');

    const product = await this.productsRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });

    const filteredCategories = product.categories.filter((item) => {
      return item.id !== categoryId;
    });

    product.categories = filteredCategories;

    return this.productsRepo.save(product);
  }

  async addCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productsRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });

    const category = await this.categoriesRepo.findOne({
      where: { id: categoryId },
    });

    if (category) {
      product.categories.push(category);
    }

    return this.productsRepo.save(product);
  }

  delete(id: number) {
    return this.productsRepo.delete(id);
  }
}
