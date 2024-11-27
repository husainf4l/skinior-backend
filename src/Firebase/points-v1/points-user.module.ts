import { Module } from '@nestjs/common';
import { PointsV1Service } from './points-user.service';
import { PointsV1Controller } from './points-user.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
    imports: [FirebaseModule],

    controllers: [PointsV1Controller],
    providers: [PointsV1Service],
})
export class PointsV1Module { }
