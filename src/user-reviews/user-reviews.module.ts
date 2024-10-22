import { Module } from '@nestjs/common';
import { UserReviewsService } from './user-reviews.service';
import { UserReviewsController } from './user-reviews.controller';

@Module({
  providers: [UserReviewsService],
  controllers: [UserReviewsController]
})
export class UserReviewsModule {}
