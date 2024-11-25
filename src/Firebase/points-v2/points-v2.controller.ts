import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PointsV2Service } from './points-v2.service';
import { FirebaseService } from '../firebase/firebase.service';

@Controller('points-v2')
export class PointsV2Controller {

    constructor(private readonly pointsV2Service: PointsV2Service, private readonly firebaseService: FirebaseService) { }

    @Get('users')
    async getAllUsers() {
        return this.pointsV2Service.getAllUsers();
    }

    @Get('users/:UserUid')
    async getUserByUid(@Param('UserUid') UserUid: string) {
        return this.pointsV2Service.getUserByUid(UserUid);
    }

    @Get('user-transactions/:UserUid')
    async getUserTransactions(@Param('UserUid') UserUid: string) {
        return this.pointsV2Service.getUserTransactions(UserUid);
    }

    @Post('send-notification')
    async sendNotification(
        @Body() body: { token: string; title: string; message: string, }
    ) {
        return this.firebaseService.sendNotification(body.token, body.title, body.message, 'pointvs1');
    }


}
