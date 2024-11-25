import { Module } from '@nestjs/common';
import { PointsUsersController } from './points-user.controller';
import { PointsUsersService } from './points-user.service';

@Module({
    controllers: [PointsUsersController],
    providers: [PointsUsersService],
})
export class PointsUsersModule { }
