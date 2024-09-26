import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateAddressnextDto } from './dto/create-addressnext.dto';
import { UpdateAddressnextDto } from './dto/update-addressnext.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
  export class AddressnextService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
      await this.$connect();
    }

  async create(createAddressnextDto: CreateAddressnextDto) {
    try {
      const {userId} = createAddressnextDto; 
      const storedAddress = await this.userAddress.findUnique({
        where: { userId },
      });
  

      const addressToSave = 
        { userId: createAddressnextDto.userId,
          address: createAddressnextDto.address,
          address2: createAddressnextDto.address2,
          countryId: createAddressnextDto.country,
          city: createAddressnextDto.city,
          firstName: createAddressnextDto.firstName,
          lastName: createAddressnextDto.lastName,
          phone: createAddressnextDto.phone,
          postalCode: createAddressnextDto.postalCode
        };

        if (!storedAddress) 
          {
            const newAddress = await this.userAddress.create({
              data: addressToSave,
            });
          return newAddress;
        }

        const updatedAddress = await this.userAddress.update({
          where: { userId },
          data: addressToSave
        })
    
        return updatedAddress;
    
    
        


    } catch (error) {
      console.log(error);
      throw new Error("No se pudo grabar la dirección");
    }

  }

  findAll() {
    return `This action returns all addressnext`;
  }

  async findOne(id: string) {
    try {
      const address = await this.userAddress.findUnique({
        where: { userId: id }
      });
  
      if ( !address ) return null;
  
      const {  countryId, address2, ...rest } = address;
  
      return {
        ...rest,
        country: countryId,
        address2: address2 ? address2 : '',
      };
  
  
    } catch (error) {
      console.log(error);
      return null;
    }  }

  update(id: number, updateAddressnextDto: UpdateAddressnextDto) {
    return `This action updates a #${id} addressnext`;
  }

  async remove(id: string) {

  try {

    const deleted = await this.userAddress.delete({
      where: { userId: id }
    });

    return { ok: true };
    
  } catch (error) {
    console.log(error);
  
    return {
      ok: false,
      message: 'No se pudo eliminar la direccion'
    }

  }
}
}
