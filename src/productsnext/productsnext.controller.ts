import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ProductsnextService } from './productsnext.service';
import { CreateProductsnextDto } from './dto/create-productsnext.dto';
import { UpdateProductsnextDto } from './dto/update-productsnext.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Product } from '@prisma/client';

@Controller('productsnext')
export class ProductsnextController {
  constructor(private readonly productsnextService: ProductsnextService) {}

  @Post()
  create(@Body() createProductsnextDto: CreateProductsnextDto, product: Product) {
    console.log('productsnext');
    return this.productsnextService.create(createProductsnextDto, product);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.productsnextService.findAll(paginationDto);
  }
  
  @Get('bystock/:slug')
  findbyUsers(@Param('slug') slug: string) {
    return this.productsnextService.findbyStock(slug);
  }
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.productsnextService.findOne( slug );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsnextDto: UpdateProductsnextDto) {
    return this.productsnextService.update(+id, updateProductsnextDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsnextService.remove(+id);
  }
}
