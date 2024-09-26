import { Module } from '@nestjs/common';
import { ProductsnextService } from './productsnext.service';
import { ProductsnextController } from './productsnext.controller';

@Module({
  controllers: [ProductsnextController],
  providers: [ProductsnextService],
})
export class ProductsnextModule {}
