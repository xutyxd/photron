import { inject, injectable } from "inversify";
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from "server-over-express";
import { BadRequestResponse } from "../../crosscutting/common/responses/bad-request.response.class";
import { IFolder } from "../interfaces/folder.interface";
import { FolderService } from "../services/folder.service";
import { NotFoundResponse } from "../../crosscutting/common/responses/not-found.response.class";

@injectable()
export class FolderController implements IHTTPController {

    public path = 'folders';

    constructor(@inject(FolderService) private readonly folderService: FolderService) { }

    public handlers: IHTTPControllerHandler<IFolder | IFolder[]>[] = [
        {
            path: { method: HttpMethodEnum.POST },
            action: this.create.bind(this)
        },
        {
            path: { method: HttpMethodEnum.GET, relative: ':id' },
            action: this.get.bind(this)
        },
        {
            path: { method: HttpMethodEnum.PATCH },
            action: this.update.bind(this)
        },
        {
            path: { method: HttpMethodEnum.DELETE },
            action: this.delete.bind(this)
        }
    ]

    public async create(request: HTTPRequest, context: IHTTPContextData) {

        const { name, description, parentId } = request.body;

        if (!name) {
            throw new BadRequestResponse('Property "name" is required', context);
        }

        let folder: IFolder;

        try {
            folder = await this.folderService.create({ name, description, parentId, ownerId: context.user.sub });
        } catch (error) {
            const message = (error as Error).message || 'Error creating folder';
            throw new BadRequestResponse(message, context);
        }

        return folder;
    }

    public async get(request: HTTPRequest, context: IHTTPContextData) {
        const { id } = request.params;

        if (!id) {
            throw new BadRequestResponse('Property "id" is required', context);
        }
        
        const folder = await this.folderService.get(Number(id));

        if (!folder) {
            throw new NotFoundResponse('Folder not found', context);
        }

        return folder;
    }

    public async update(request: HTTPRequest, context: IHTTPContextData) {
        const { id, name, description, parentId } = request.body;

        if (!id) {
            throw new BadRequestResponse('Property "id" is required', context);
        }

        const folder = await this.folderService.update(Number(id), { name, description, parentId });

        if (!folder) {
            throw new NotFoundResponse('Folder not found', context);
        }

        return folder;
    }

    public async delete(request: HTTPRequest, context: IHTTPContextData) {

        const { id } = request.query as { [key: string]: string };

        if (!id) {
            throw new BadRequestResponse('Property "id" is required', context);
        }

        const folder = await this.folderService.delete(Number(id));

        if (!folder) {
            throw new NotFoundResponse('Folder not found', context);
        }

        return folder;
    }
}