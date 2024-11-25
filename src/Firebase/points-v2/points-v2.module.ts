import { Module } from '@nestjs/common';
import { PointsV2Service } from './points-v2.service';
import { PointsV2Controller } from './points-v2.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
    imports: [FirebaseModule],
    providers: [PointsV2Service],
    controllers: [PointsV2Controller]
})
export class PointsV2Module { }
