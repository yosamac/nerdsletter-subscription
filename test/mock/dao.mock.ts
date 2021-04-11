import { of, throwError } from 'rxjs';

export const emailRegistered = 'valid@email.com';
export const validNewsletterId = 'validNerdsLetter';

export const validSubscriptionId = 'validSubscriptionId';
const validSubscription = {
    id: validSubscriptionId,
    email: 'yos@nerdsletter.com',
    dateOfBirth: '1990-08-24',
    flagForConsent: true,
    newsletterId: 'campaign-1',
    firstName: 'Yosnier',
    gender: 'MALE',
    createAt: Date.now()
};

export class DaoServiceMock {
    create(data) {
        if (data.email == emailRegistered &&
            data.newsletterId == validNewsletterId
        ) {
            return throwError({ code: 11000, details: 'Email already exists' });
        }
        return of(validSubscription);
    }

    findAll() {
        return of([validSubscription]);
    }

    findOne(id: string) {
        return id == validSubscriptionId
            ? of(validSubscription)
            : of(null);
    }
}
