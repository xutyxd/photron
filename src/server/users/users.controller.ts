import { injectable } from 'inversify';
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from 'server-over-express';

@injectable()
export class UsersController implements IHTTPController {

    public path = 'users';

    constructor() { }

    public handlers: IHTTPControllerHandler<unknown>[] = [
        {
            path: { method: HttpMethodEnum.GET, relative: 'me' },
            action: this.me.bind(this)
        }
    ]

    public me(request: HTTPRequest, context: IHTTPContextData) {
        return { code: 200, data: { name: 'user-name' } };
    }
}