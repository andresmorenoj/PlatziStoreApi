import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('products')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string = '',
  ) {
    return `Products id: ${limit} - offset: ${offset} - brand: ${brand}`;
  }

  @Get('products/filter')
  getProductFilter() {
    return 'Yo soy filter';
  }

  @Get('products/:productId')
  getProduct(@Param('productId') productId: string) {
    return `Product id: ${productId}`;
  }

  @Get('categories/:id/products/:productId')
  getCategories(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return `Category id: ${id} and product id: ${productId}`;
  }
}
