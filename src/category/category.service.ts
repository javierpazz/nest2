import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CategoryService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
      await this.$connect();
    }
  

async   findAll() {

    try {
      const categories = await this.category.findMany({
        orderBy: {
          name: 'asc'
        }
      });


      return categories;



  } catch (error) {
    console.log(error);
    return [];
  }



  }
}
