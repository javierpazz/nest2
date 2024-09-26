import { Injectable, OnModuleInit, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
      await this.$connect();
    }

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll(@Query() paginationDto:PaginationDto ) {

    const orders = await this.order.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })
  
    return {
      ok: true,
      orders: orders,
    }
    }

  async findOne(id: string) {

    try {
    
      const order = await this.order.findUnique({
        where: { id },
        include: {
          OrderAddress: true,
          OrderItem: {
            select: {
              price: true,
              quantity: true,
              size: true,
  
              product: {
                select: {
                  title: true,
                  slug: true,
  
                  ProductImage: {
                    select: {
                      url: true
                    },
                    take: 1
                  }
                }
              }
            }
          }
        }
      });
  
      if( !order ) throw `${ id } no existe`;
  
      return {
        ok: true,
        order: order,
      }
  
  
    } catch (error) {
  
      console.log(error);
  
      return {
        ok: false,
        message: 'Orden no existe'
      }
  
  
    }
  
  


  }

  async findbyUsers(userid: string) {
    const orders = await this.order.findMany({
      where: {
        userId: userid
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })
  
    return {
      ok: true,
      orders: orders,
    }
  
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
