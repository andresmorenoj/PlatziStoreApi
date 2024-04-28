import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string = '',
  ) {
    return {
      message: `Products id: ${limit} - offset: ${offset} - brand: ${brand}`,
    };
  }

  @Get('filter')
  getProductFilter() {
    return {
      message: 'Yo soy filter',
    };
  }

  @Get(':productId')
  findOne(@Param('productId') productId: string) {
    return {
      message: `Product id: ${productId}`,
    };
  }

  @Post()
  create(@Body() payload) {
    return {
      message: 'create action',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload) {
    return {
      message: 'Product modified',
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      message: `Product with id "${id}" has been deleted successfully`,
    };
  }
}
