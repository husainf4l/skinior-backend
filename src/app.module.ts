import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

import { CsvUploadController } from './csv-upload/csv-upload.controller';
import { CsvUploadService } from './csv-upload/csv-upload.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { ShippingMethodsModule } from './shipping-methods/shipping-methods.module';
import { UserReviewsModule } from './user-reviews/user-reviews.module';
import { ProductsVariantsService } from './products-variants/products-variants.service';
import { ProductsVariantsController } from './products-variants/products-variants.controller';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';


@Module({
  imports: [PrismaModule, UsersModule, ProductsModule, CategoriesModule, OrdersModule, ShippingMethodsModule, UserReviewsModule, CartModule],
  controllers: [CsvUploadController, ProductsVariantsController],
  providers: [CsvUploadService, ProductsVariantsService, CartService],
})
export class AppModule { }
