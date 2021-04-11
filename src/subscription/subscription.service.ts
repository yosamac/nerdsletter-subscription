import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { catchError, map , } from 'rxjs/operators';


import { ServiceLogger } from '../logger/logger.service';
import { EmailMeshService } from '../mesh/email';
import { DaoService } from '../dao/dao.service';
import { handleError } from '../common/helper';


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
        const res = from (
            this.daoService.create(newSubscription)
        );

        return res.pipe(
            map(newSubscription => {
                return newSubscription;
            }),
            catchError(handleError(this.logger))
        );
    }
}
