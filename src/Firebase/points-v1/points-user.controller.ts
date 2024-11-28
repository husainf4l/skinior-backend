import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { PointsV1Service } from './points-user.service';


@Controller('points-v1')
export class PointsV1Controller {
    constructor(private readonly pointsV1Service: PointsV1Service, private readonly firebaseService: FirebaseService) { }

    @Get('users')
    async getAllUsers() {
        return this.pointsV1Service.getAllUsers();
    }

    @Get('users/:UserUid')
    async getUserByUid(@Param('UserUid') UserUid: string) {
        return this.pointsV1Service.getUserByUid(UserUid);
    }

    @Get('user-transactions/all')
    async getTransactions(
        @Query('limit') limit: number,
        @Query('toggle') toggle: string
    ): Promise<any[]> {
        const transactionLimit = limit ? +limit : 100;
        const isChecked = toggle === 'true';
        return this.pointsV1Service.getAllTransactions(+transactionLimit, isChecked);
    }

    @Post('redeem/add')
    async redeemAdd(
        @Body() body: {

            transactionId: string,
            UserUid: string,
            points: number,
            currentPoints: number,

        }
    ) {
        return this.pointsV1Service.redeemAdd(body);
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
        return this.pointsV1Service.editAdd(body);
    }

    @Get('transactions/:id')
    async getTransactionById(
        @Param('id') id: string,
        @Query('useruid') useruid: string
    ) {
        return this.pointsV1Service.getTransactionById(id, useruid);
    }

    @Get('wallet/:UserUid')
    async userWallet(
        @Param('UserUid') UserUid: string,
    ) {
        return this.pointsV1Service.userWallet(UserUid);
    }


    @Put('transactions/:transactionId')
    async updatePoints(
        @Param('transactionId') transactionId: string,
        @Body() data: { margoSales: number; papayaSales: number; lavaSales: number; bracket: number; currentPoints: number, invRef: string, UserUid: string, userName: string, posName: string }
    ) {
        return this.pointsV1Service.updatePoints(transactionId, data);
    }



    @Get('user-transactions/:UserUid')
    async getUserTransactions(@Param('UserUid') UserUid: string) {
        return this.pointsV1Service.getUserTransactions(UserUid);
    }

    @Post('send-notification')
    async sendNotification(
        @Body() body: { token: string; title: string; message: string, }
    ) {
        return this.firebaseService.sendNotification(body.token, body.title, body.message, 'pointvs1');
    }

    @Get('getcompanytransactionbyid/:id')
    async getcompanytransactionbyid(@Param('id') id: string) {
        return this.pointsV1Service.getCompanyTransactionById(id);
    }


    @Put('update-bracket')
    async updateBracket(@Body() body: { UserUid: string; bracket: number }) {
        const { UserUid, bracket } = body;

        if (!UserUid || bracket == null) {
            throw new BadRequestException('Missing required fields.');
        }

        return this.pointsV1Service.updateBracket(body)
    }


    @Get('ops')
    upateAllUsers() {
        this.pointsV1Service.updateAllUsers();
    }
}
