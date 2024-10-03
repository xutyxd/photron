import { Ajv } from "ajv";
import { inject, injectable } from "inversify";
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from "server-over-express";
import idModel from "../../../openapi/common/id-request.model.json";
import tagBase from "../../../openapi/tag/request/tag-base.request.json";
import tagCreate from "../../../openapi/tag/request/tag-create.request.json";
import tagUpdate from "../../../openapi/tag/request/tag-update.request.json";
import { BaseError, NotFoundError } from "../../crosscutting/common/errors";
import { BadRequestResponse, InternalErrorResponse, NotFoundResponse } from "../../crosscutting/common/responses";
import { TagAPI } from "../classes/tag-api.class";
import { ITagAPI } from "../interfaces/tag-api.interface";
import { TagService } from "../services/tag.service";
import { PartialTag } from "../types/partial-tag.type";

@injectable()
export class TagController implements IHTTPController {

    public path = 'tags';

    constructor(@inject(TagService) private readonly tagService: TagService) { }

    public handlers: IHTTPControllerHandler<ITagAPI | ITagAPI[]>[] = [
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
            const validate = ajv.compile<{ uuid: string }>(idModel);

            if (!validate(params)) {
                const error = validate.errors?.map(({ message }) => message).join(', ');
                throw new BadRequestResponse(error || 'something is missing', context);
            }
            
            const { uuid } = params;

            return uuid;
        },
        body: (request: HTTPRequest, context: IHTTPContextData, schema: typeof tagCreate | typeof tagUpdate) => {
            const { body } = request;

            const ajv = new Ajv({ strict: false })
                            .addSchema(tagBase, 'tag-base.request.json');
            const validate = ajv.compile<PartialTag>(schema);

            if (!validate(body)) {
                const error = validate.errors?.map(({ message }) => message).join(', ');
                throw new BadRequestResponse(error || 'something is missing', context);
            }

            return body;
        }
    }

    public async create(request: HTTPRequest, context: IHTTPContextData) {
        const body = this.validate.body(request, context, tagCreate);

        let result: ITagAPI;

        try {
            const tag = await this.tagService.create(body);

            result = new TagAPI({ ...tag, owner: context.user.name }).export();
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error creating tag';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);

            throw toThrow;
        }

        return result;
    }

    public async list(request: HTTPRequest, context: IHTTPContextData) {
        
        let result: ITagAPI[];

        try {
            const tags = await this.tagService.list();
            const owner = context.user.name;

            result = tags.map((tag) => new TagAPI({ ...tag, owner }).export());
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error listing tag';

            throw new InternalErrorResponse(message, context);
        }
        
        return result;
    }

    public async get(request: HTTPRequest, context: IHTTPContextData) {
        const uuid = this.validate.params(request, context);
        
        let result: ITagAPI;

        try {
            const tag = await this.tagService.get(uuid);

            result = new TagAPI({ ...tag, owner: context.user.name }).export();

        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error getting tag';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);
            
            throw toThrow;
        }

        return result;
    }

    public async update(request: HTTPRequest, context: IHTTPContextData) {
        const uuid = this.validate.params(request, context);
        const body = this.validate.body(request, context, tagUpdate);

        let result: ITagAPI;

        try {
            const tag = await this.tagService.update(uuid, body);

            result = new TagAPI({ ...tag, owner: context.user.name }).export();
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error updating tag';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);
            
            throw toThrow;
        }

        return result;
    }

    public async delete(request: HTTPRequest, context: IHTTPContextData) {
        const uuid = this.validate.params(request, context);

        let result: ITagAPI;

        try {
            const tag = await this.tagService.delete(uuid);

            result = new TagAPI({ ...tag, owner: context.user.name }).export();
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error deleting tag';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);
            
            throw toThrow;
        }

        return result;
    }
}