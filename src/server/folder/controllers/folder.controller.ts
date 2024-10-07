import { inject, injectable } from "inversify";
import { HTTPRequest, IHTTPContextData, IHTTPController } from "server-over-express";
import { EntityController } from "../../crosscutting/common";
import { FolderAPI } from "../classes/folder-api.class";
import { IFolderAPIData, IFolderData, IFolderModelData } from "../interfaces/data";
import { folderBase, folderCreate, folderUpdate } from "../schemas";
import { FolderService } from "../services/folder.service";

@injectable()
export class FolderController extends EntityController<IFolderAPIData, IFolderData, IFolderModelData> implements IHTTPController {

    public path = 'folders';

    constructor(@inject(FolderService) readonly folderService: FolderService) {
        const schemas = {
            base: folderBase,
            create: folderCreate,
            update: folderUpdate,
            ref: '#/components/schemas/folder-base.request'
        };

        super(folderService, schemas, FolderAPI)
    }

    public async create(request: HTTPRequest, context: IHTTPContextData) {

        const folder = await super.create(request, context);
        // Add owner to folder
        folder.owner = context.user.name;

        return folder;
    }

    public async list(request: HTTPRequest, context: IHTTPContextData) {

        const folders = await super.list(request, context);
        // Add owner to folders
        folders.forEach((folder) => folder.owner = context.user.name);

        return folders;
    }

    public async get(request: HTTPRequest, context: IHTTPContextData) {
        const folder = await super.get(request, context);
        // Add owner to folder
        folder.owner = context.user.name;

        return folder;
    }

    public async update(request: HTTPRequest, context: IHTTPContextData) {
        const folder = await super.update(request, context);
        // Add owner to folder
        folder.owner = context.user.name;

        return folder;
    }

    public async delete(request: HTTPRequest, context: IHTTPContextData) {
        const folder = await super.delete(request, context);
        // Add owner to folder
        folder.owner = context.user.name;

        return folder;
    }
}