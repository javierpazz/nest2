import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CountryService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
      await this.$connect();
    }

 async findAll() {
    try {
    
      const countries = await this.country.findMany({
        orderBy: {
          name: 'asc'
        }
      });
  
      return countries;
  
  
    } catch (error) {
      console.log(error);
      return [];
    }
  
  

  }
}
