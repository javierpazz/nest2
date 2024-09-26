import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto1';
import { IsUUID } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

  // @IsUUID(4)
  // id: string;


}
