import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CartService } from './cart.service';


@Module({
  imports: [PrismaModule],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule { }
