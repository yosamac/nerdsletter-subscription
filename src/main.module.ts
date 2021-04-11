import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import configuration from './config/configuration';
import { LoggerModule } from './logger/logger.module';
import { SubscriptionModule } from './subscription/subscription.module';

const MongoProvider: MongooseModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
        uri:  config.get<string>('database.uri'),
        useCreateIndex: true,
    }),
    inject: [ConfigService]
};

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load:[configuration]
        }),
        LoggerModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync(MongoProvider),
        SubscriptionModule
    ]
})
export class MainModule {}
