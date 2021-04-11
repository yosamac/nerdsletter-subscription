
export class EmailServiceMock {
    constructor() {}

    sendEmail(data) {
        console.log('Sending email');
        return Promise.resolve();
    }
}
