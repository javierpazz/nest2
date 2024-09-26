import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { AddressnextService } from './addressnext.service';
import { CreateAddressnextDto } from './dto/create-addressnext.dto';
import { UpdateAddressnextDto } from './dto/update-addressnext.dto';

@Controller('addressnext')
export class AddressnextController {
  constructor(private readonly addressnextService: AddressnextService) {}

  @Post()
  create(@Body() createAddressnextDto: CreateAddressnextDto) {
    return this.addressnextService.create(createAddressnextDto);
  }

  @Get()
  findAll() {
    return this.addressnextService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe ) id: string) {
    return this.addressnextService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressnextDto: UpdateAddressnextDto) {
    return this.addressnextService.update(+id, updateAddressnextDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressnextService.remove(id);
  }
}
