import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  findAll() {
    return this.countryService.findAll();
  }
}
