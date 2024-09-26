import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressnextDto } from './create-addressnext.dto';

export class UpdateAddressnextDto extends PartialType(CreateAddressnextDto) {}
