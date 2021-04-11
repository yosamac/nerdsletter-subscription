import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

import { MainModule } from './main.module';
import { ServiceLogger } from './logger/logger.service';

async function bootstrap() {
    const app = await NestFactory.create(MainModule, {
        logger: false,
    });

    const config = app.get<ConfigService>(ConfigService);

    app.connectMicroservice({
        transport: Transport.TCP,
        options: {
            host: config.get<string>('host'),
            port: config.get<number>('port'),
            retryAttempts: 5,
            retryDelay: 3000,
        }
    });

    app.useLogger(new ServiceLogger(config));

    const logger = await app.resolve<ServiceLogger>(ServiceLogger);

    await app.startAllMicroservicesAsync();
    logger.info(`Service listening on port: ${config.get<number>('port')}`);
}

bootstrap();
