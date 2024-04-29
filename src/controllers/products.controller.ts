import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { ProductsService } from './../services/products.service';
import { ParseIntPipe } from './../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string = '',
  ) {
    return this.productsService.findAll();
    // return {
    //   message: `Products id: ${limit} - offset: ${offset} - brand: ${brand}`,
    // };
  }

  @Get('filter')
  getProductFilter() {
    return {
      message: 'Yo soy filter',
    };
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  findOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
    // return {
    //   message: `Product id: ${productId}`,
    // };
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return {
      message: 'Create action',
      payload: this.productsService.create(payload),
    };
    // return {
    //   message: 'create action',
    //   payload,
    // };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return {
      message: 'Product modified',
      payload: this.productsService.update(id, payload),
    };
    // return {
    //   message: 'Product modified',
    //   id,
    //   payload,
    // };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
    // return {
    //   message: `Product with id "${id}" has been deleted successfully`,
    // };
  }
}
