import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartService } from './cart/cart.service';
import { CartController } from './cart/cart.controller';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { CsvUploadController } from './csv-upload/csv-upload.controller';
import { CsvUploadService } from './csv-upload/csv-upload.service';
import { OrderCartService } from './order-cart/order-cart.service';
import { OrderCartController } from './order-cart/order-cart.controller';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ProductsModule],
  controllers: [AppController, CartController, OrderController, CsvUploadController, OrderCartController],
  providers: [AppService, CartService, OrderService, CsvUploadService, OrderCartService],
})
export class AppModule { }
