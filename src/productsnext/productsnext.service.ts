import { Injectable, OnModuleInit, Query } from '@nestjs/common';
import { CreateProductsnextDto } from './dto/create-productsnext.dto';
import { UpdateProductsnextDto } from './dto/update-productsnext.dto';
import { PrismaClient, Product, Size } from '@prisma/client';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ProductsnextService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
      await this.$connect();
    }

  async create(createProductsnextDto: CreateProductsnextDto, product: Product) {
    console.log('product');
    const { id, ...rest } = product;
  
    // const tagsArray = rest.tags.split(',').map( tag => tag.trim().toLowerCase() );

    try {
      const prismaTx = await this.$transaction( async (tx) => {
    
    
        if ( id ) {
          // Actualizar
          product = await this.product.update({
            where: { id },
            data: {
              ...rest,
              sizes: {
                set: rest.sizes as Size[],
              },
              tags: {
                set: rest.tags
              }
            }
          });
    
        } else {
          // Crear
          product = await this.product.create({
            data: {
              ...rest,
              sizes: {
                set: rest.sizes as Size[],
              },
              tags: {
                set: rest.tags
              }
            }
          })
        }
        
        return {
          product
        }
      });
  
      return {
        ok: true,
        product: prismaTx.product,
      }
  
      
    } catch (error) {
      
      return {
        ok: false,
        message: 'Revisar los logs, no se pudo actualizar/crear'
      }
    }
  
  }

  async findAll( @Query() paginationDto:PaginationDto ) {
    const { page, limit, gender } = paginationDto;
    let offset=0;
    if (isNaN(Number(page))) offset = 1;
    if (offset < 1) offset = 1;
  
    try {
      // 1. Obtener los productos
      const products = await this.product.findMany({
        take: limit,
        skip: (offset - 1) * limit,
        include: {
          ProductImage: {
            take: 2,
            select: {
              url: true,
            },
          },
        },
        //! Por género
        where: {
          gender: gender,
        },
      });
  
      // 2. Obtener el total de páginas
      // todo:
      const totalCount = await this.product.count({
        where: {
          gender: gender,
        },
      });
      
      const totalPages = Math.ceil(totalCount / limit);
  
      return {
        currentPage: page,
        totalPages: totalPages,
        products: products.map((product) => ({
          ...product,
          images: product.ProductImage.map((image) => image.url),
        })),
      };
    } catch (error) {
      throw new Error("No se pudo cargar los productos");
    }
  
    // return `This action returns all productsnext`;
  }

  async findbyStock(slug: string) {
    try {
  
      const stock = await this.product.findFirst({
        where: { slug },
        select: { inStock: true }
      });

      return stock?.inStock ?? 0;
  
    } catch (error) {
      return 0;
    }
  }

  async findOne(slug: string) {
     try {
      const product = await this.product.findFirst({
        include: {
          ProductImage: true
        },
        where: {
          slug: slug,
        }
      })
      if ( !product ) return null;

      return {
        ...product,
        images: product.ProductImage.map( image => image.url )
      };
  
      
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener producto por slug');
    }
  }

  update(id: number, updateProductsnextDto: UpdateProductsnextDto) {
    return `This action updates a #${id} productsnext`;
  }

  remove(id: number) {
    return `This action removes a #${id} productsnext`;
  }
}
