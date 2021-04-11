import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MainModule } from '../../src/main.module';
import { PublicService } from '../../src/public/public.service';
import { ServiceException } from '../../src/common/service.exception';
import { toSubscriptionDTO } from '../../src/public/public.mapper';
import {
    SubscriptionServiceMock,
    emailRegistered,
    validNewsletterId
} from '../mock/mesh.mock';
import {
    SubscriptionMeshService
} from '../../src/mesh/subscription/subscription.service';

export const envs = {
    LOGGING_LEVEL: 'NONE',
    NODE_ENV: 'development'
};

describe('PublicService', () => {
    let publicService: PublicService;

    beforeAll(async () => {

        process.env = Object.assign(process.env, envs);

        const app: TestingModule = await Test.createTestingModule({
            imports: [MainModule]
        })
            .overrideProvider(SubscriptionMeshService)
            .useClass(SubscriptionServiceMock)
            .compile();

        publicService = app.get<PublicService>(PublicService);
    });

    describe('#createSubscription', () => {
        const validSubscription = {
            email: 'yos@nerdsletter.com',
            dateOfBirth: '1990-08-24',
            flagForConsent: true,
            newsletterId: 'campaign-1',
            firstName: 'Yosnier',
            gender: 'MALE'
        };

        it('Should create a new subscription', (done) => {

            const res = publicService.createSubscription(validSubscription);

            res.subscribe(subscription => {
                expect(subscription).toMatchObject(toSubscriptionDTO(validSubscription));
                done();
            });
        });

        it('Should throw a service exception 409', (done) => {
            const existingSubscription = {
                ...validSubscription,
                email: emailRegistered,
                newsletterId: validNewsletterId
            };

            const res = publicService.createSubscription(existingSubscription);

            res.pipe(
                catchError(ex => of(ex))
            ).subscribe(err=> {
                expect(err).toBeInstanceOf(ServiceException);
                expect(err.getStatus()).toBe(HttpStatus.CONFLICT);
                done();
            });
        });
    });
});
