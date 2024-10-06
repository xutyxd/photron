import { inject, injectable } from "inversify";
import { IHTTPController } from "server-over-express";
import { EntityController } from "../../crosscutting/common";
import { FileAPI } from "../classes";
import { IFileAPIData, IFileData, IFileModelData } from "../interfaces/data";
import { IFileAPIStatic } from "../interfaces/static";
import { fileBase, fileCreate, fileUpdate } from "../schemas";
import { FileService } from "../services/file.service";

@injectable()
export class FileController extends EntityController<IFileAPIData, IFileData, IFileModelData, IFileAPIStatic> implements IHTTPController {

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

    // public handlers: IHTTPControllerHandler<IFileAPI | IFileAPI[]>[] = [
    //     {
    //         path: { method: HttpMethodEnum.POST },
    //         action: this.create.bind(this)
    //     },
    //     {
    //         path: { method: HttpMethodEnum.GET },
    //         action: this.list.bind(this)
    //     },
    //     {
    //         path: { method: HttpMethodEnum.GET, relative: ':id' },
    //         action: this.get.bind(this)
    //     },
    //     {
    //         path: { method: HttpMethodEnum.PATCH, relative: ':id' },
    //         action: this.update.bind(this)
    //     },
    //     {
    //         path: { method: HttpMethodEnum.DELETE, relative: ':id' },
    //         action: this.delete.bind(this)
    //     }
    // ]

    // private validate = {
    //     params: (request: HTTPRequest, context: IHTTPContextData) => {
    //         const { params } = request;

    //         const ajv = new Ajv({ strict: false });
    //         const validate = ajv.compile<{ uuid: string }>(idRequest);

    //         if (!validate(params)) {
    //             const error = validate.errors?.map(({ message }) => message).join(', ');
    //             throw new BadRequestResponse(error || 'something is missing', context);
    //         }
            
    //         const { uuid } = params;

    //         return uuid;
    //     },
    //     body: (request: HTTPRequest, context: IHTTPContextData, schema: typeof fileCreate | typeof fileUpdate) => {
    //         const { body } = request;

    //         const ajv = new Ajv({ strict: false })
    //                         .addSchema(fileBase, '#/components/schemas/file-base.request');
    //         const validate = ajv.compile<PartialFile>(schema);

    //         if (!validate(body)) {
    //             const error = validate.errors?.map(({ message }) => message).join(', ');
    //             throw new BadRequestResponse(error || 'something is missing', context);
    //         }

    //         return body;
    //     }
    // }

    // public async create(request: HTTPRequest, context: IHTTPContextData) {

    //     const body = this.validate.body(request, context, fileCreate);

    //     let result: IFileAPI;

    //     try {
    //         const file = await this.fileService.create(body);

    //         result = new FileAPI({ ...file, owner: context.user.name }).export();
    //     } catch (error) {
    //         const message = error instanceof BaseError ? error.message : 'Error creating file';

    //         const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
    //         const toThrow = new toInstance(message, context);

    //         throw toThrow;
    //     }

    //     return result;
    // }

    // public async list(request: HTTPRequest, context: IHTTPContextData) {

    //     let result: IFileAPI[];

    //     try {
    //         const files = await this.fileService.list();
    //         const owner = context.user.name;

    //         result = files.map((file) => new FileAPI({ ...file, owner }).export());
    //     } catch (error) {
    //         const message = error instanceof BaseError ? error.message : 'Error listing file';

    //         throw new InternalErrorResponse(message, context);
    //     }

    //     return result;
    // }

    // public async get(request: HTTPRequest, context: IHTTPContextData) {
    //     const uuid = this.validate.params(request, context);

    //     let result: IFileAPI;

    //     try {
    //         const file = await this.fileService.get(uuid);

    //         result = new FileAPI({ ...file, owner: context.user.name }).export();

    //     } catch (error) {
    //         const message = error instanceof BaseError ? error.message : 'Error getting file';

    //         const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
    //         const toThrow = new toInstance(message, context);

    //         throw toThrow;
    //     }

    //     return result;
    // }

    // public async update(request: HTTPRequest, context: IHTTPContextData) {
    //     const uuid = this.validate.params(request, context);
    //     const body = this.validate.body(request, context, fileUpdate);

    //     let result: IFileAPI;

    //     try {
    //         const file = await this.fileService.update(uuid, body);

    //         result = new FileAPI({ ...file, owner: context.user.name }).export();
    //     } catch (error) {
    //         const message = error instanceof BaseError ? error.message : 'Error updating file';

    //         const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
    //         const toThrow = new toInstance(message, context);

    //         throw toThrow;
    //     }

    //     return result;
    // }

    // public async delete(request: HTTPRequest, context: IHTTPContextData) {
    //     const uuid = this.validate.params(request, context);

    //     let result: IFileAPI;

    //     try {
    //         const file = await this.fileService.delete(uuid);

    //         result = new FileAPI({ ...file, owner: context.user.name }).export();
    //     } catch (error) {
    //         const message = error instanceof BaseError ? error.message : 'Error deleting file';

    //         const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
    //         const toThrow = new toInstance(message, context);

    //         throw toThrow;
    //     }

    //     return result;
    // }
}