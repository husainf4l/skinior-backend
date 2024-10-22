import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

import { CsvUploadController } from './csv-upload/csv-upload.controller';
import { CsvUploadService } from './csv-upload/csv-upload.service';
import { UsersModule } from './users/users.module';
import { ShoppingCartsModule } from './shopping-carts/shopping-carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { ProductsModule } from './products/products.module';
import { ProductItemsModule } from './product-items/product-items.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { OrderLinesModule } from './order-lines/order-lines.module';
import { ShippingMethodsModule } from './shipping-methods/shipping-methods.module';
import { UserReviewsModule } from './user-reviews/user-reviews.module';


@Module({
  imports: [PrismaModule, UsersModule, ShoppingCartsModule, CartItemsModule, ProductsModule, ProductItemsModule, CategoriesModule, OrdersModule, OrderLinesModule, ShippingMethodsModule, UserReviewsModule],
  controllers: [ CsvUploadController],
  providers: [ CsvUploadService],
})
export class AppModule { }
