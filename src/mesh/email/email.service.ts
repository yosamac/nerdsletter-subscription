import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { EMAIL_MESH_CLIENT } from './email.constant';
import { ServiceLogger } from '../../logger/logger.service';

@Injectable()
export class EmailMeshService {
    constructor(
        private readonly logger: ServiceLogger,
        @Inject(EMAIL_MESH_CLIENT)
        private readonly emailClient: ClientProxy
    ) {}

    sendEmail(data: any): Promise<any> {

        const mailData: any = {
            to: data.email,
            metadata: {
                gender: data.gender,
                dateOfBirth: data.dateOfBirth
            }
        };

        return this.emailClient.emit<any>(
            { cmd: 'subscription_created' },
            { ...mailData }
        ).toPromise().catch(err => {
            this.logger.error(err);
        });
    }
}
