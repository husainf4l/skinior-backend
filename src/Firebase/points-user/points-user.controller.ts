import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PointsUsersService } from './points-user.service';

@Controller('points-users')
export class PointsUsersController {
    constructor(private readonly pointsUsersService: PointsUsersService) { }

    @Get()
    async getAllUsers() {
        return this.pointsUsersService.getAllUsers();
    }

    @Get('old')
    async getOldUsers() {
        return this.pointsUsersService.getOldUsers();
    }


    @Get('search')
    async getUserByNameContains(@Query('UserName') substring: string) {
        return this.pointsUsersService.getUserByNameContains(substring);
    }

    @Get('transactions/:id')
    async getTransactions(@Param('id') id: string) {
        return this.pointsUsersService.getUserTransactions(id);
    }

    @Get('wallet/:id')
    async getWallet(@Param('id') id: string) {
        return this.pointsUsersService.getUserWallet2(id);
    }
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.pointsUsersService.getUserById(id);
    }

    @Post()
    async addUser(@Body() user: any) {
        return this.pointsUsersService.addUser(user);
    }





}
