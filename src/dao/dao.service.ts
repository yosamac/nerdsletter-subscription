import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Subscription, SubscriptionDocument } from '../dao/subscription.schema';

export enum ServiceLoggerLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    ERROR = 'ERROR',
    NONE = 'NONE'
}

@Injectable()
export class DaoService {
    constructor(
        @InjectModel(Subscription.name)
        private readonly subscriptionModel: Model<SubscriptionDocument>,
    ) {}

    create(data: Subscription): Promise<Subscription>{
        const createdSubscription = new this.subscriptionModel(data);
        return createdSubscription.save();
    }
}