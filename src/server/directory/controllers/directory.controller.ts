import { inject, injectable } from 'inversify';
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from 'server-over-express';
import { DirectoryService } from '../services/directory.service';

@injectable()
export class DirectoryController implements IHTTPController {

    public path = 'directories';

    public handlers: IHTTPControllerHandler<unknown>[] = [
        {
            path: { method: HttpMethodEnum.GET, relative: '*' },
            action: this.get.bind(this)
        }
    ];

    constructor(@inject(DirectoryService) readonly directoryService: DirectoryService) { }

    public async get(request: HTTPRequest, context: IHTTPContextData): Promise<any> {
        const { params } = request;

        if (!params[0]) {
            return;
        }

        const foldersIndex = params[0].split('/').filter(Boolean);
        const directory = await this.directoryService.get(foldersIndex, context);

        return { code: 200, data: directory };
    }
}
