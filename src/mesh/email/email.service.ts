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
            to: data.dto.email,
            template: data.template,
            eventType: data.eventType,
            metadata: { ...data.dto }
        };

        return this.emailClient.send<any>(
            { cmd: 'sendMail' },
            { ...mailData }
        ).toPromise().catch(err => {
            this.logger.error(err);
        });
    }
}
