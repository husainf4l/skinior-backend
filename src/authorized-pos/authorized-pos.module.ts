import { Module } from '@nestjs/common';
import { AuthorizedPosService } from './authorized-pos.service';
import { AuthorizedPosController } from './authorized-pos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AuthorizedPosService],
  controllers: [AuthorizedPosController]
})
export class AuthorizedPosModule { }
