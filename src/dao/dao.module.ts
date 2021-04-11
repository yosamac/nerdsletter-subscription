import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DaoService } from './dao.service';
import { Subscription, SubscriptionSchema } from './subscription.schema';

@Module({
    imports:[
        MongooseModule.forFeature([
            { name: Subscription.name, schema: SubscriptionSchema }
        ])
    ],
    providers: [DaoService],
    exports:[DaoService]
})
export class DaoModule {}