import { Ajv } from "ajv";
import { inject, injectable } from "inversify";
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from "server-over-express";
import { BaseError, NotFoundError } from "../../crosscutting/common/errors";
import { BadRequestResponse, InternalErrorResponse, NotFoundResponse } from "../../crosscutting/common/responses";
import { idRequest } from "../../crosscutting/common/schemas";
import { FolderAPI } from "../classes/folder-api.class";
import { IFolderAPI } from "../interfaces/folder-api.interface";
import { folderBase, folderCreate, folderUpdate } from "../schemas";
import { FolderService } from "../services/folder.service";
import { PartialFolder } from "../types/partial-folder.type";

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

    private validate = {
        params: (request: HTTPRequest, context: IHTTPContextData) => {
            const { params } = request;

            const ajv = new Ajv({ strict: false });
            const validate = ajv.compile<{ uuid: string }>(idRequest);

            if (!validate(params)) {
                const error = validate.errors?.map(({ message }) => message).join(', ');
                throw new BadRequestResponse(error || 'something is missing', context);
            }
            
            const { uuid } = params;

            return uuid;
        },
        body: (request: HTTPRequest, context: IHTTPContextData, schema: typeof folderCreate | typeof folderUpdate) => {
            const { body } = request;

            console.log('Folderbase', folderBase);
            console.log('Schema', schema);
            const ajv = new Ajv({ strict: false })
                            .addSchema(folderBase, '#/components/schemas/folder-base.request');
            const validate = ajv.compile<PartialFolder>(schema);

            if (!validate(body)) {
                const error = validate.errors?.map(({ message }) => message).join(', ');
                throw new BadRequestResponse(error || 'something is missing', context);
            }

            return body;
        }
    }

    public async create(request: HTTPRequest, context: IHTTPContextData) {

        const body = this.validate.body(request, context, folderCreate);

        let result: IFolderAPI;

        try {
            const folder = await this.folderService.create(body);

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
            const owner = context.user.name;

            result = folders.map((folder) => new FolderAPI({ ...folder, owner }).export());
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error listing folder';

            throw new InternalErrorResponse(message, context);
        }

        return result;
    }

    public async get(request: HTTPRequest, context: IHTTPContextData) {
        const uuid = this.validate.params(request, context);

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
        const uuid = this.validate.params(request, context);
        const body = this.validate.body(request, context, folderUpdate);

        let result: IFolderAPI;

        try {
            const folder = await this.folderService.update(uuid, body);

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
        const uuid = this.validate.params(request, context);

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