import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ProductsnextModule } from './productsnext/productsnext.module';
import { AddressnextModule } from './addressnext/addressnext.module';
import { CategoryModule } from './category/category.module';
import { CountryModule } from './country/country.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, ProductsModule, ProductsnextModule, AddressnextModule, CategoryModule, CountryModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
