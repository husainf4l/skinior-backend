import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
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

    @Get('user-transactions/all')
    async getTransactions(
        @Query('limit') limit: number,
        @Query('toggle') toggle: string
    ): Promise<any[]> {
        const transactionLimit = limit ? +limit : 100;
        const isChecked = toggle === 'true';
        return this.pointsV2Service.getAllTransactions(+transactionLimit, isChecked);
    }

    @Post('redeem/add')
    async redeemAdd(
        @Body() body: {

            transactionId: string,
            UserUid: string,
            points: number,
            fcmToken: string,
            currentPoints: number,

        }
    ) {
        return this.pointsV2Service.redeemAdd(body);
    }
    ///edit/add
    @Post('edit/add')
    async editAdd(
        @Body() body: {

            UserUid: string;
            date: string;
            type: number;
            status: string;
            points: number;
            PosName: string;
            UserName: string;

        }
    ) {
        return this.pointsV2Service.editAdd(body);
    }

    @Put('transactions/:transactionId')
    async updatePoints(
        @Param('transactionId') transactionId: string,
        @Body() data: { margoSales: number; papayaSales: number; lavaSales: number; bracket: number; currentPoints: number, invRef: string, UserUid: string, userName: string, posName: string, fcmToken: string }
    ) {
        return this.pointsV2Service.updatePoints(transactionId, data);
    }

    @Get('transactions/:id')
    async getTransactionById(@Param('id') id: string) {
        return this.pointsV2Service.getTransactionById(id);
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

    @Get('getcompanytransactionbyid/:id')
    async getcompanytransactionbyid(@Param('id') id: string) {
        return this.pointsV2Service.getCompanyTransactionById(id);
    }

}
