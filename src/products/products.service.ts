import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto1';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll( paginationDto: PaginationDto ) {
    const { page, limit } = paginationDto;

    // const totalPages = await this.product.count({ where: { available: true } });
    const totalPages = await this.product.count();
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        // where: {
        //   available: true,
        // },
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      },
    };

  }


  async findOne(id: string) {
    const order = await this.product.findFirst({
      where: { id },
    });
    return order;
  }


  async update(id: string, updateProductDto: UpdateProductDto) {
    // const { id: __, ...data } = updateProductDto;

    await this.findOne(id);

    return this.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

    async  remove(id: string) {
      await this.findOne(id);

    // return this.product.delete({
    //   where: { id }
    // });

    // const product = await this.product.update({
    //   where: { id },
    //   data: {
    //     available: false,
    //   },
    // });
    const product = await this.product.delete({
      where: { id },
    });


    return product;
  }
}
