import Ajv from "ajv";
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPControllerHandler } from "server-over-express";
import { BaseError, NotFoundError } from "../errors";
import { IRecord, IRecordModel, IRecordStatic } from "../interfaces";
import { BadRequestResponse, InternalErrorResponse, NotFoundResponse } from "../responses";
import { idRequest } from "../schemas";
import { RecordService } from "../services";
import { RecordAPI } from "../classes";

export class RecordController<D extends IRecordStatic, I extends IRecord, IM extends IRecordModel> {

    constructor(private service: RecordService<D, I, IM>,
                private schemas: { base: object, create: object, update: object, ref: string },
                private readonly record: typeof RecordAPI) { }

    public handlers: IHTTPControllerHandler<ReturnType<RecordAPI['export']> | ReturnType<RecordAPI['export']>[]>[] = [
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
    ];

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
        body: (request: HTTPRequest, context: IHTTPContextData, schema: object) => {
            const { body } = request;

            const ajv = new Ajv({ strict: false })
                            .addSchema(this.schemas.base, this.schemas.ref);
            const validate = ajv.compile<Omit<I, keyof IRecord>>(schema);

            if (!validate(body)) {
                const error = validate.errors?.map(({ message }) => message).join(', ');
                throw new BadRequestResponse(error || 'something is missing', context);
            }

            return body;
        }
    }

    public async create(request: HTTPRequest, context: IHTTPContextData) {

        const body = this.validate.body(request, context, this.schemas.create);

        let result: ReturnType<RecordAPI['export']>;

        try {
            const record = await this.service.create(body);

            result = new this.record(record).export();
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error creating record';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);

            throw toThrow;
        }

        return result;
    }

    public async list(request: HTTPRequest, context: IHTTPContextData) {

        let result: ReturnType<RecordAPI['export']>[];

        try {
            const records = await this.service.list();

            result = records.map((record) => new this.record(record).export());
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error listing record';

            throw new InternalErrorResponse(message, context);
        }

        return result;
    }

    public async get(request: HTTPRequest, context: IHTTPContextData) {
        const uuid = this.validate.params(request, context);

        let result: ReturnType<RecordAPI['export']>;

        try {
            const record = await this.service.get(uuid);

            result = new this.record(record).export();

        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error getting record';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);

            throw toThrow;
        }

        return result;
    }

    public async update(request: HTTPRequest, context: IHTTPContextData) {
        const uuid = this.validate.params(request, context);
        const body = this.validate.body(request, context, this.schemas.update);

        let result: ReturnType<RecordAPI['export']>;

        try {
            const record = await this.service.update(uuid, body);

            result = new this.record(record).export();
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error updating file';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);

            throw toThrow;
        }

        return result;
    }

    public async delete(request: HTTPRequest, context: IHTTPContextData) {
        const uuid = this.validate.params(request, context);

        let result: ReturnType<RecordAPI['export']>;

        try {
            const record = await this.service.delete(uuid);

            result = new this.record(record).export();
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error deleting file';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);

            throw toThrow;
        }

        return result;
    }
}
