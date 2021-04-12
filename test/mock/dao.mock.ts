
export const emailRegistered = 'valid@email.com';
export const validNewsletterId = 'validNerdsLetter';

export const validSubscriptionId = 'validSubscriptionId';
export const validSubscription = {
    id: validSubscriptionId,
    email: 'yos@nerdsletter.com',
    dateOfBirth: '1990-08-24',
    flagForConsent: true,
    newsletterId: 'campaign-1',
    firstName: 'Yosnier',
    gender: 'MALE',
};

export class DaoServiceMock {
    async create(data): Promise<any> {
        if (data.email == emailRegistered &&
            data.newsletterId == validNewsletterId
        ) {
            return Promise.reject({ code: 11000, details: 'Email already exists' });
        }
        return Promise.resolve(validSubscription);
    }

    findAll(): Promise<any[]> {
        return Promise.resolve([validSubscription]);
    }

    findOne(id: string): Promise<any> {
        return id == validSubscriptionId
            ? Promise.resolve(validSubscription)
            : Promise.resolve(null);
    }

    deleteOne(id: string): Promise<any> {
        return id == validSubscriptionId
            ? Promise.resolve({ deletedCount: 1, ok:1, n: 1 })
            : Promise.resolve({ deletedCount: 0, ok:1, n: 0 });
    }
}
