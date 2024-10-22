import { Module } from '@nestjs/common';
import { OrderLinesService } from './order-lines.service';
import { OrderLinesController } from './order-lines.controller';

@Module({
  providers: [OrderLinesService],
  controllers: [OrderLinesController]
})
export class OrderLinesModule {}
