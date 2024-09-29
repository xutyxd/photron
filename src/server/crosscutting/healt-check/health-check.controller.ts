import { injectable } from 'inversify';
import { HttpMethodEnum, IHTTPController, IHTTPControllerHandler } from 'server-over-express';
import { version } from '../../../../package.json';

@injectable()
export class HealthCheckController implements IHTTPController {

    public path = 'health-check';
    public handlers: IHTTPControllerHandler<{ version: string, uptime: number }>[];

    constructor() {
        this.handlers = [
            {
                path: { method: HttpMethodEnum.GET },
                action: this.healthCheck
            }
        ]
    }

    public healthCheck() {
        const uptime = process.uptime();
        return { version, uptime };
    }
}