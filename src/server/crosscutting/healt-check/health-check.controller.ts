import { injectable } from 'inversify';
import { HttpMethodEnum, IHTTPController, IHTTPControllerHandler } from 'server-over-express';

@injectable()
export class HealthCheckController implements IHTTPController {

    public path = 'health-check';
    public handlers: IHTTPControllerHandler<number>[];

    constructor() {
        this.handlers = [
            {
                path: { method: HttpMethodEnum.GET },
                action: this.healthCheck
            }
        ]
    }

    public healthCheck() {
        return process.uptime();
    }
}