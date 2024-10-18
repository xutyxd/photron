import { inject, injectable } from 'inversify';
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from 'server-over-express';
import { BaseError, NotFoundError } from '../../crosscutting/common/errors';
import { InternalErrorResponse, NotFoundResponse } from '../../crosscutting/common/responses';
import { DirectoryAPI } from '../classes';
import { IDirectoryAPIData } from '../interfaces/data';
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

    public async get(request: HTTPRequest, context: IHTTPContextData): Promise<IDirectoryAPIData> {
        const { params } = request;

        let result: IDirectoryAPIData;

        try {
            const foldersIndex = (params[0] || '').split('/').filter(Boolean);
            const directory = await this.directoryService.get(foldersIndex, context);

            result = DirectoryAPI.fromDomain(directory).toApi();
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error creating record';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);

            throw toThrow;
        }

        return result;
    }
}
