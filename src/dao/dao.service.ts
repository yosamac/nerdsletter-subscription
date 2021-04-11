import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Subscription, SubscriptionDocument } from '../dao/subscription.schema';

@Injectable()
export class DaoService {
    constructor(
        @InjectModel(Subscription.name)
        private readonly subscriptionModel: Model<SubscriptionDocument>,
    ) {}

    create(data: Subscription): Promise<Subscription> {
        const createdSubscription = new this.subscriptionModel(data);
        return createdSubscription.save();
    }

    findAll(): Promise<Subscription[]> {
        return this.subscriptionModel.find().exec();
    }

    findOne(id:string): Promise<Subscription> {
        return this.subscriptionModel.findById(id).exec();
    }

    deleteOne(id:string): Promise<any> {
        return this.subscriptionModel.deleteOne({ _id: id }).exec();
    }
}