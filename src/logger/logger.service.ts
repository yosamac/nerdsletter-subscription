import { Injectable, Scope, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export enum ServiceLoggerLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    ERROR = 'ERROR',
    NONE = 'NONE'
}

const JSON_INDENT = 4;

@Injectable({ scope: Scope.TRANSIENT })
export class ServiceLogger extends Logger implements LoggerService {
    private _level: ServiceLoggerLevel;

    get level(): ServiceLoggerLevel {
        return this._level || ServiceLoggerLevel.INFO;
    }

    constructor(private readonly config: ConfigService) {
        super();
        this._level = ServiceLoggerLevel[config.get<string>('logger.level')];
    }

    log(message: string, context?: string) {
        if (this.level == ServiceLoggerLevel.NONE) return;

        if (this.level != ServiceLoggerLevel.ERROR) {
            super.log(message, context);
        }
    }

    logs(...messages: any[]) {
        this.log(this.parseMessage(messages));
    }

    info(message:string, context?: string) {
        this.log(message, context);
    }

    debug(message: string, context?: string) {
        if (this.level == ServiceLoggerLevel.NONE) return;

        if (this.level == ServiceLoggerLevel.DEBUG) {
            super.debug(message, context);
        }
    }

    debugs(...messages: any[]) {
        this.debug(this.parseMessage(messages));
    }

    errors(...messages: any[]) {
        if (this.level == ServiceLoggerLevel.NONE) return;

        this.errors(this.parseMessage(messages));
    }

    private parseMessage(messages: any[]) {
        return messages.map(msg => {
            return typeof msg !== 'string'
                ? JSON.stringify(msg, null, JSON_INDENT)
                : msg
        }).join('\n');
    }

}