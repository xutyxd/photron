import { inject, injectable } from "inversify";
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from "server-over-express";
import { BaseError, NotFoundError } from "../../crosscutting/common/errors";
import { BadRequestResponse, InternalErrorResponse, NotFoundResponse } from "../../crosscutting/common/responses";
import { FolderAPI } from "../classes/folder-api.class";
import { IFolderAPI } from "../interfaces/folder-api.interface";
import { FolderService } from "../services/folder.service";

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

        const { name, description, parentIndex, tags = { include: [], exclude: [] } } = request.body;

        if (!name) {
            throw new BadRequestResponse('Property "name" is required', context);
        }

        let result: IFolderAPI;

        try {
            const folder = await this.folderService.create({
                name,
                description,
                parentIndex,
                ownerIndex: context.user.sub,
                files: [],
                tags: {
                    include: tags.include || [],
                    exclude: tags.exclude || []
                }
            });

            result = new FolderAPI({ ...folder, owner: context.user.name }).export();
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error creating folder';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);
            
            throw toThrow;
        }

        return result;
    }

    public async list(request: HTTPRequest, context: IHTTPContextData) {
        
        let result: IFolderAPI[];

        try {
            const folders = await this.folderService.list();

            result = folders.map((folder) => new FolderAPI({ ...folder, owner: context.user.name }).export());
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error listing folder';

            throw new InternalErrorResponse(message, context);
        }
        
        return result;
    }

    public async get(request: HTTPRequest, context: IHTTPContextData) {
        const { uuid } = request.params;

        if (!uuid) {
            throw new BadRequestResponse('Property "uuid" is required', context);
        }
        
        let result: IFolderAPI;

        try {
            const folder = await this.folderService.get(uuid);

            result = new FolderAPI({ ...folder, owner: context.user.name }).export();

        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error getting folder';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);
            
            throw toThrow;
        }

        return result;
    }

    public async update(request: HTTPRequest, context: IHTTPContextData) {
        const { uuid } = request.params;
        const { name, description, parentIndex } = request.body;

        if (!uuid) {
            throw new BadRequestResponse('Property "uuid" is required', context);
        }

        let result: IFolderAPI ;

        try {
            const folder = await this.folderService.update(uuid, { name, description, parentIndex });

            result = new FolderAPI({ ...folder, owner: context.user.name }).export();
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error updating folder';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);
            
            throw toThrow;
        }

        return result;
    }

    public async delete(request: HTTPRequest, context: IHTTPContextData) {
        const { uuid } = request.params;

        if (!uuid) {
            throw new BadRequestResponse('Property "uuid" is required', context);
        }

        let result: IFolderAPI;

        try {
            const folder = await this.folderService.delete(uuid);

            result = new FolderAPI({ ...folder, owner: context.user.name }).export();
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error deleting folder';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);
            
            throw toThrow;
        }

        return result;
    }
}