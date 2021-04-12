
export class EmailServiceMock {

    sendEmail(data): Promise<any> {
        console.log('Sending email');
        return Promise.resolve();
    }
}
