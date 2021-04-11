import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SubscriptionService } from './subscription.service';
import { EmailMeshModule } from '../mesh/email';
import { DaoModule } from '../dao/dao.module';
import {
    SubscriptionMessageController
} from './subscription.message.controller';

@Module({
    imports:[
        ConfigModule,
        DaoModule,
        EmailMeshModule
    ],
    controllers: [SubscriptionMessageController],
    providers: [SubscriptionService]
})
export class SubscriptionModule {}
