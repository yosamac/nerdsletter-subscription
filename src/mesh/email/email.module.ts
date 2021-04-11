import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { EmailMeshService } from './email.service';
import { EMAIL_MESH_CLIENT } from './email.constant';

const EmailProvider = {
    provide: EMAIL_MESH_CLIENT,
    useFactory: (config: ConfigService) => {
        return ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: config.get<string>('mesh.email.host'),
                port: config.get<number>('mesh.email.port')
            }
        });
    },
    inject: [ConfigService]
};

@Module({
    providers: [EmailMeshService, EmailProvider],
    exports: [EmailMeshService]
})
export class EmailMeshModule {}
