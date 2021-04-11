import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { EMAIL_MESH_CLIENT } from './email.constant';

@Injectable()
export class EmailMeshService {
    constructor(
        @Inject(EMAIL_MESH_CLIENT)
        private readonly emailClient: ClientProxy
    ) {}

    sendEmail(data: any): Observable<any> {
        return this.emailClient.send<any>(
            { cmd: 'sendEmail' },
            { ...data }
        );
    }
}
