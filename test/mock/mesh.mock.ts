import { of, throwError } from 'rxjs';

export const emailRegistered = 'valid@email.com';
export const validNewsletterId = 'validNerdsLetter';

export class SubscriptionServiceMock {
    createSubscription(data) {
        if (data.email == emailRegistered &&
            data.newsletterId == validNewsletterId
        ) {
            return throwError({ code: 6, details: 'Email already exists' });
        }
        return of(data);
    }
}
