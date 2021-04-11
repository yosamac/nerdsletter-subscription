import { ServiceException, ServiceExceptionStatus } from './service.exception';
import { ServiceLogger } from '../logger/logger.service';

type ExplicitError = {
    status: ServiceExceptionStatus;
    msg?: string;
};

function handlerHelper(error): void | never {

    if (error instanceof ServiceException) throw error;
    if ('code' in error) {
        throw new ServiceException(
            error.code,
            error.details || ServiceExceptionStatus[error.code]
        );
    }

    if ('status' in error) {
        throw new ServiceException(
            error.status,
            error.msg || ServiceExceptionStatus[error.status]
        );
    }

    throw error;
}

export const handleError: (
    logger: ServiceLogger,
    err?: ExplicitError
) => ((err: any) => any) | any =
    (logger, err) => {
        if (err) {
            logger?.debugs(
                'Debugging managed error:',
                JSON.stringify(err, null, 4)
            );

            handlerHelper(err);
        }

        return (error) => {
            logger?.errors(
                'Service error:',
                error,
                JSON.stringify(error, null, 4)
            );

            handlerHelper(error);
        };
    };

export const mapMeshError: (logger: ServiceLogger) => (err: any) => never =
    (logger) => {
        return (error) => {
            logger.errors('Mesh error:', error, JSON.stringify(error, null, 4));
            throw new ServiceException(error.status, 'Mesh error');
        };
    };
