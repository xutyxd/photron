import { Ajv } from "ajv";
import { inject, injectable } from "inversify";
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from "server-over-express";
import { EntityController } from "../../crosscutting/common";
import { BaseError, NotFoundError } from "../../crosscutting/common/errors";
import { BadRequestResponse, InternalErrorResponse, NotFoundResponse } from "../../crosscutting/common/responses";
import { idRequest } from "../../crosscutting/common/schemas";
import { FolderAPI } from "../classes/folder-api.class";
import { IFolderAPIData, IFolderData, IFolderModelData } from "../interfaces/data";
import { IFolderAPI } from "../interfaces/dto";
import { folderBase, folderCreate, folderUpdate } from "../schemas";
import { FolderService } from "../services/folder.service";
import { PartialFolder } from "../types/partial-folder.type";
import { IFolderAPIStatic } from "../interfaces/static";

@injectable()
export class FolderController extends EntityController<IFolderAPIData, IFolderData, IFolderModelData, IFolderAPIStatic> implements IHTTPController {

    public path = 'folders';

    constructor(@inject(FolderService) private readonly folderService: FolderService) {
        const schemas = {
            base: folderBase,
            create: folderCreate,
            update: folderUpdate,
            ref: '#/components/schemas/folder-base.request'
        };

        super(folderService, schemas, FolderAPI)
    }

    // public async create(request: HTTPRequest, context: IHTTPContextData) {

    //     const body = this.validate.body(request, context, folderCreate);

    //     let result: IFolderAPI;

    //     try {
    //         const folder = await this.folderService.create(body);

    //         result = new FolderAPI({ ...folder, owner: context.user.name }).export();
    //     } catch (error) {
    //         const message = error instanceof BaseError ? error.message : 'Error creating folder';

    //         const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
    //         const toThrow = new toInstance(message, context);

    //         throw toThrow;
    //     }

    //     return result;
    // }

    // public async list(request: HTTPRequest, context: IHTTPContextData) {

    //     let result: IFolderAPI[];

    //     try {
    //         const folders = await this.folderService.list();
    //         const owner = context.user.name;

    //         result = folders.map((folder) => new FolderAPI({ ...folder, owner }).export());
    //     } catch (error) {
    //         const message = error instanceof BaseError ? error.message : 'Error listing folder';

    //         throw new InternalErrorResponse(message, context);
    //     }

    //     return result;
    // }

    // public async get(request: HTTPRequest, context: IHTTPContextData) {
    //     const uuid = this.validate.params(request, context);

    //     let result: IFolderAPI;

    //     try {
    //         const folder = await this.folderService.get(uuid);

    //         result = new FolderAPI({ ...folder, owner: context.user.name }).export();

    //     } catch (error) {
    //         const message = error instanceof BaseError ? error.message : 'Error getting folder';

    //         const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
    //         const toThrow = new toInstance(message, context);

    //         throw toThrow;
    //     }

    //     return result;
    // }

    // public async update(request: HTTPRequest, context: IHTTPContextData) {
    //     const uuid = this.validate.params(request, context);
    //     const body = this.validate.body(request, context, folderUpdate);

    //     let result: IFolderAPI;

    //     try {
    //         const folder = await this.folderService.update(uuid, body);

    //         result = new FolderAPI({ ...folder, owner: context.user.name }).export();
    //     } catch (error) {
    //         const message = error instanceof BaseError ? error.message : 'Error updating folder';

    //         const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
    //         const toThrow = new toInstance(message, context);

    //         throw toThrow;
    //     }

    //     return result;
    // }

    // public async delete(request: HTTPRequest, context: IHTTPContextData) {
    //     const uuid = this.validate.params(request, context);

    //     let result: IFolderAPI;

    //     try {
    //         const folder = await this.folderService.delete(uuid);

    //         result = new FolderAPI({ ...folder, owner: context.user.name }).export();
    //     } catch (error) {
    //         const message = error instanceof BaseError ? error.message : 'Error deleting folder';

    //         const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
    //         const toThrow = new toInstance(message, context);

    //         throw toThrow;
    //     }

    //     return result;
    // }
}