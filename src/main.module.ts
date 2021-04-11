import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import configuration from './config/configuration';
import { LoggerModule } from './logger/logger.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load:[configuration]
        }),
        LoggerModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot('mongodb://localhost:27017/subscription'),
        SubscriptionModule
    ]
})
export class MainModule {}
