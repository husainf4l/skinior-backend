import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UserService, PrismaService,JwtModule],
  controllers: [UserController],
  exports: [UserService], 
})
export class UsersModule {}
