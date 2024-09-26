import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsnextDto } from './create-productsnext.dto';

export class UpdateProductsnextDto extends PartialType(CreateProductsnextDto) {}
