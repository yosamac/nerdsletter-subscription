import { Controller, UsePipes, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionPipe } from './dto/request/create.subscription.dto';
import { SubscriptionIdPipe } from './dto/request/subscription.id.dto';
import { ServiceExceptionFilter } from '../common/exception.filter';

@Controller()
@UseFilters(ServiceExceptionFilter)
export class SubscriptionMessageController {
    constructor(private readonly subscriptionService: SubscriptionService) {}

    @MessagePattern({ cmd: 'createSubscription' })
    @UsePipes(CreateSubscriptionPipe)
    createSubscription(data: any): Observable<any> {
        return this.subscriptionService.createSubscription(data);
    }

    @MessagePattern({ cmd: 'getAllSubscriptions' })
    getAllSubscriptions(): Observable<any> {
        return this.subscriptionService.getAllSubscriptions();
    }

    @MessagePattern({ cmd: 'getSubscription' })
    @UsePipes(SubscriptionIdPipe)
    getSubscription(data: any): Observable<any> {
        return this.subscriptionService.getSubscription(data.id);
    }

    @MessagePattern({ cmd: 'cancelSubscription' })
    @UsePipes(SubscriptionIdPipe)
    cancelSubscription(data: any): Observable<any> {
        return this.subscriptionService.deleteSubscription(data.id);
    }
}
