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
import { BannerModule } from './banner/banner.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthorizedPosModule } from './authorized-pos/authorized-pos.module';
import { FirebaseModule } from './Firebase/firebase/firebase.module';
import { PointsUsersModule } from './Firebase/points-user/points-user.module';
import { PointsV2Module } from './Firebase/points-v2/points-v2.module';


@Module({
  imports: [PrismaModule, FirebaseModule, PointsUsersModule, UsersModule, ProductsModule, CategoriesModule, OrdersModule, ShippingMethodsModule, UserReviewsModule, CartModule, BannerModule, AuthorizedPosModule, CacheModule.register({
    ttl: 60,
    max: 200,
  }), PointsV2Module,
  ],
  controllers: [CsvUploadController, ProductsVariantsController],
  providers: [CsvUploadService, ProductsVariantsService, CartService],
})
export class AppModule { }
