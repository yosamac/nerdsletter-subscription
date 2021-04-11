import { DynamicModule, Module } from '@nestjs/common';

import { ServiceLogger } from './logger.service';

type LoggerModuleOptions = {
    isGlobal?: boolean;
};

@Module({
    imports: [],
    providers: [ServiceLogger],
    exports: [ServiceLogger]
})
export class LoggerModule {
    static forRoot(options: LoggerModuleOptions = {}): DynamicModule {
        return {
            module: LoggerModule,
            global: options.isGlobal
        };
    }
}