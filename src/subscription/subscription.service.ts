import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ServiceLogger } from '../logger/logger.service';
import { EmailMeshService } from '../mesh/email';
import { DaoService } from '../dao/dao.service';
import { handleError } from '../common/helper';
import { ServiceExceptionStatus } from '../common/service.exception';
import { toSubscription, toSubscriptionDTO } from './subscription.mapper';

@Injectable()
export class SubscriptionService {
    constructor(
        private readonly logger: ServiceLogger,
        private daoService: DaoService,
        private emailService: EmailMeshService
    ) {
        const instance = this.constructor;
        logger.setContext(instance.name);
    }

    createSubscription(
        newSubscription: any
    ): Observable<any> {
        this.logger.debug(`Creating new subscription for ${newSubscription.email}`);

        const res = from (this.daoService.create(
            toSubscription(newSubscription)
        ));

        return res.pipe(
            map(newSubscription => {

                this.emailService.sendEmail(newSubscription);

                return toSubscriptionDTO(newSubscription);
            }),
            catchError(err => {
                if (err.code === 11000) {
                    return handleError(this.logger)({
                        code: ServiceExceptionStatus.ALREADY_EXISTS,
                        details: 'Email already exists'
                    });
                }
                return handleError(this.logger)(err);
            })
        );
    }

    getAllSubscriptions(): Observable<any> {
        this.logger.debug('Getting all subscriptions ');

        const res = from (this.daoService.findAll());
        return res.pipe(catchError(handleError(this.logger)));
    }


}
