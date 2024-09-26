import { Module } from '@nestjs/common';
import { AddressnextService } from './addressnext.service';
import { AddressnextController } from './addressnext.controller';

@Module({
  controllers: [AddressnextController],
  providers: [AddressnextService],
})
export class AddressnextModule {}
