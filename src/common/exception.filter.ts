import { Catch,
    ArgumentsHost, RpcExceptionFilter
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError, Observable } from 'rxjs';

type ServiceTCPResponse = {
    code: number,
    message: string,
    timestamp
};

@Catch(RpcException)
export class ServiceExceptionFilter implements RpcExceptionFilter<RpcException> {
    catch(exception: RpcException, host: ArgumentsHost):Observable<any> {

        return throwError(exception.getError());
    }
}