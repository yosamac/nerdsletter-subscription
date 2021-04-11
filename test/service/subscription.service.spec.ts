import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MainModule } from '../../src/main.module';
import {
    SubscriptionService
} from '../../src/subscription/subscription.service';
import {
    ServiceException,
    ServiceExceptionStatus
} from '../../src/common/service.exception';

import {
    DaoServiceMock,
    emailRegistered,
    validNewsletterId,
    validSubscriptionId
} from '../mock/dao.mock';
import {
    EmailMeshService
} from '../../src/mesh/email/email.service';
import { DaoService } from '../../src/dao/dao.service';

export const envs = {
    LOGGING_LEVEL: 'NONE',
    NODE_ENV: 'development'
};

describe('subscriptionService', () => {
    let subscriptionService: SubscriptionService;
    let emailService: EmailMeshService;

    beforeAll(async () => {

        process.env = Object.assign(process.env, envs);

        const app: TestingModule = await Test.createTestingModule({
            imports: [MainModule]
        })
            .overrideProvider(DaoService)
            .useClass(DaoServiceMock)
            .compile();

        subscriptionService = app.get<SubscriptionService>(SubscriptionService);
        emailService = app.get<EmailMeshService>(EmailMeshService);
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

            const res = subscriptionService.createSubscription(validSubscription);
            const spy = jest.spyOn(emailService, 'sendEmail');

            res.subscribe(subscription => {
                expect(subscription.id).toBeDefined();
                expect(subscription.email).toEqual(validSubscription.email);
                expect(spy).toBeCalled();
                spy.mockReset();
                done();
            });
        });

        it('Should throw a service exception with status: ALREADY_EXISTS', (done) => {
            const existingSubscription = {
                ...validSubscription,
                email: emailRegistered,
                newsletterId: validNewsletterId
            };

            const res = subscriptionService.createSubscription(existingSubscription);
            const spy = jest.spyOn(emailService, 'sendEmail');

            res.pipe(
                catchError(ex => of(ex))
            ).subscribe(err=> {
                expect(err).toBeInstanceOf(ServiceException);
                expect(err.status).toBe(ServiceExceptionStatus.ALREADY_EXISTS);
                expect(spy).not.toBeCalled();
                spy.mockReset();
                done();
            });
        });
    });

    describe('#getAllSubscriptions', () => {

        it('Should return all subscriptions', (done) => {

            const res = subscriptionService.getAllSubscriptions();

            res.subscribe(subscription => {
                expect(subscription).toBeInstanceOf(Array);
                done();
            });
        });
    });

    describe('#getSubscription', () => {

        it('Should return a subscription', (done) => {

            const res = subscriptionService.getSubscription(validSubscriptionId);

            res.subscribe(subscription => {
                expect(subscription.id).toEqual(validSubscriptionId);
                done();
            });
        });

        it('Should throw a service exception 404', (done) => {

            const invalidId = 'invalidId';

            const res = subscriptionService.getSubscription(invalidId);

            res.pipe(
                catchError(err => of(err))
            ).subscribe(ex => {
                expect(ex).toBeInstanceOf(ServiceException);
                expect(ex.status).toBe(ServiceExceptionStatus.NOT_FOUND);
                done();
            });
        });
    });

    // describe('#cancelSubscription', () => {

    //     it('Should delete a subscription', (done) => {

    //         const res = subscriptionService.cancelSubscription(validSubscriptionId);

    //         res.subscribe(response => {
    //             expect(response).toBeUndefined();
    //             done();
    //         });
    //     });

    //     it('Should throw a service exception 404', (done) => {

    //         const invalidId = 'invalidId';

    //         const res = subscriptionService.cancelSubscription(invalidId);

    //         res.pipe(
    //             catchError(err => of(err))
    //         ).subscribe(ex => {
    //             expect(ex).toBeInstanceOf(ServiceException);
    //             expect(ex.getStatus()).toBe(HttpStatus.NOT_FOUND);
    //             done();
    //         });
    //     });
    // });
});
