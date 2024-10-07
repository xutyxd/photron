import { inject, injectable } from "inversify";
import { HTTPRequest, IHTTPContextData, IHTTPController } from "server-over-express";
import { EntityController } from "../../crosscutting/common";
import { FileAPI } from "../classes";
import { IFileAPIData, IFileData, IFileModelData } from "../interfaces/data";
import { fileBase, fileCreate, fileUpdate } from "../schemas";
import { FileService } from "../services/file.service";

@injectable()
export class FileController extends EntityController<IFileAPIData, IFileData, IFileModelData> implements IHTTPController {

    public path = 'files';

    constructor(@inject(FileService) readonly fileService: FileService) {
        const schemas = {
            base: fileBase,
            create: fileCreate,
            update: fileUpdate,
            ref: '#/components/schemas/file-base.request'
        };

        super(fileService, schemas, FileAPI);
    }

    public async create(request: HTTPRequest, context: IHTTPContextData) {

        const file = await super.create(request, context);
        // Add owner to file
        file.owner = context.user.name;

        return file;
    }

    public async list(request: HTTPRequest, context: IHTTPContextData) {

        const files = await super.list(request, context);
        // Add owner to files
        files.forEach((file) => file.owner = context.user.name);

        return files;
    }

    public async get(request: HTTPRequest, context: IHTTPContextData) {
        const file = await super.get(request, context);
        // Add owner to file
        file.owner = context.user.name;

        return file;
    }

    public async update(request: HTTPRequest, context: IHTTPContextData) {
        const file = await super.update(request, context);
        // Add owner to file
        file.owner = context.user.name;

        return file;
    }

    public async delete(request: HTTPRequest, context: IHTTPContextData) {
        const file = await super.delete(request, context);
        // Add owner to file
        file.owner = context.user.name;

        return file;
    }
}