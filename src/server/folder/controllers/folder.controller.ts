import { inject, injectable } from "inversify";
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from "server-over-express";
import { BadRequestResponse } from "../../crosscutting/common/responses/bad-request.response.class";
import { IFolder } from "../interfaces/folder.interface";
import { FolderService } from "../services/folder.service";

@injectable()
export class FolderController implements IHTTPController {

    public path = 'folders';

    constructor(@inject(FolderService) private readonly folderService: FolderService) { }

    public handlers: IHTTPControllerHandler<IFolder | unknown>[] = [
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
            return new BadRequestResponse('Property "name" is required', context);
        }

        const folder = this.folderService.create({ name, description, parentId, ownerId: context.user.id });

        return folder;
    }

    public async get(request: HTTPRequest, context: IHTTPContextData) {
        const { id } = request.params;

        if (!id) {
            return new BadRequestResponse('Property "id" is required', context);
        }

        const folder = await this.folderService.get(Number(id));

        return folder;
    }

    public async update(request: HTTPRequest, context: IHTTPContextData) {
        const { id, name, description, parentId } = request.body;

        if (!id) {
            return new BadRequestResponse('Property "id" is required', context);
        }

        const folder = await this.folderService.update(Number(id), { name, description, parentId });

        return folder;
    }

    public async delete(request: HTTPRequest, context: IHTTPContextData) {

        const { id } = request.query as { [key: string]: string };

        if (!id) {
            return new BadRequestResponse('Property "id" is required', context);
        }

        const folder = await this.folderService.delete(Number(id));

        return folder;
    }
}