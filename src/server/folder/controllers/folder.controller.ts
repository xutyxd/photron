import { inject, injectable } from "inversify";
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from "server-over-express";
import { BadRequestResponse } from "../../crosscutting/common/responses/bad-request.response.class";
import { FolderService } from "../services/folder.service";
import { NotFoundResponse } from "../../crosscutting/common/responses/not-found.response.class";
import { IFolderAPI } from "../interfaces/folder-api.interface";
import { FolderAPI } from "../classes/folder-api.class";
import { InternalErrorResponse } from "../../crosscutting/common/responses/internal-error.response.class";

@injectable()
export class FolderController implements IHTTPController {

    public path = 'folders';

    constructor(@inject(FolderService) private readonly folderService: FolderService) { }

    public handlers: IHTTPControllerHandler<IFolderAPI | IFolderAPI[]>[] = [
        {
            path: { method: HttpMethodEnum.POST },
            action: this.create.bind(this)
        },
        {
            path: { method: HttpMethodEnum.GET },
            action: this.list.bind(this)
        },
        {
            path: { method: HttpMethodEnum.GET, relative: ':id' },
            action: this.get.bind(this)
        },
        {
            path: { method: HttpMethodEnum.PATCH, relative: ':id' },
            action: this.update.bind(this)
        },
        {
            path: { method: HttpMethodEnum.DELETE, relative: ':id' },
            action: this.delete.bind(this)
        }
    ]

    public async create(request: HTTPRequest, context: IHTTPContextData) {

        const { name, description, parentId } = request.body;

        if (!name) {
            throw new BadRequestResponse('Property "name" is required', context);
        }

        let result: IFolderAPI;

        try {
            const folder = await this.folderService.create({
                name,
                description,
                parentId,
                ownerId: context.user.sub,
                owner: context.user.name,
                filesIds: [],
                files: []
            });

            result = new FolderAPI(folder).export();
        } catch (error) {
            const message = (error as Error).message || 'Error creating folder';
            throw new InternalErrorResponse(message, context);
        }

        return result;
    }

    public async list(request: HTTPRequest, context: IHTTPContextData) {
        
        let result: IFolderAPI[];

        try {
            const folders = await this.folderService.list();

            result = folders.map((folder) => new FolderAPI(folder).export());
        } catch (error) {
            const message = (error as Error).message || 'Error getting folders';
            throw new InternalErrorResponse(message, context);
        }
        
        return result;
    }

    public async get(request: HTTPRequest, context: IHTTPContextData) {
        const { id } = request.params;

        if (!id) {
            throw new BadRequestResponse('Property "id" is required', context);
        }
        
        let result: IFolderAPI | undefined;

        try {
            const folder = await this.folderService.get(Number(id));

            if (folder) {
                result = new FolderAPI(folder).export();
            }

        } catch (error) {
            const message = (error as Error).message || 'Error getting folder';
            throw new InternalErrorResponse(message, context);
        }

        if (!result) {
            throw new NotFoundResponse('Folder not found', context);
        }

        return result;
    }

    public async update(request: HTTPRequest, context: IHTTPContextData) {
        const { id } = request.params;
        const { name, description, parentId } = request.body;

        if (!id) {
            throw new BadRequestResponse('Property "id" is required', context);
        }

        let result: IFolderAPI | undefined;

        try {
            const folder = await this.folderService.update(Number(id), { name, description, parentId });

            if (folder) {
                result = new FolderAPI(folder).export();
            }
        } catch (error) {
            const message = (error as Error).message || 'Error getting folder';
            throw new InternalErrorResponse(message, context);
        }

        if (!result) {
            throw new NotFoundResponse('Folder not found', context);
        }

        return result;
    }

    public async delete(request: HTTPRequest, context: IHTTPContextData) {
        const { id } = request.params;

        if (!id) {
            throw new BadRequestResponse('Property "id" is required', context);
        }

        let result: IFolderAPI | undefined;

        try {
            const folder = await this.folderService.delete(Number(id));

            if (folder) {
                result = new FolderAPI(folder).export();
            }
        } catch (error) {
            const message = (error as Error).message || 'Error getting folder';
            throw new InternalErrorResponse(message, context);
        }

        if (!result) {
            throw new NotFoundResponse('Folder not found', context);
        }

        return result;
    }
}