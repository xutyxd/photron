import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from "server-over-express";
import { ITagAPI } from "../interfaces/tag-api.interface";
import { BadRequestResponse } from "../../crosscutting/common/responses/bad-request.response.class";
import { TagAPI } from "../classes/tag-api.class";
import { InternalErrorResponse } from "../../crosscutting/common/responses/internal-error.response.class";
import { TagService } from "../services/tag.service";
import { inject, injectable } from "inversify";
import { NotFoundResponse } from "../../crosscutting/common/responses/not-found.response.class";

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

    public async create(request: HTTPRequest, context: IHTTPContextData) {
        const { name, description, color } = request.body;

        if (!name) {
            throw new BadRequestResponse('Property "name" is required', context);
        }

        let result: ITagAPI;

        try {
            const tag = await this.tagService.create({
                name,
                description,
                color,
                ownerId: context.user.sub,
                owner: context.user.name
            });

            result = new TagAPI(tag).export();
        } catch (error) {
            const message = (error as Error).message || 'Error creating tag';
            throw new InternalErrorResponse(message, context);
        }

        return result;
    }

    public async list(request: HTTPRequest, context: IHTTPContextData) {
        
        let result: ITagAPI[];

        try {
            const tags = await this.tagService.list();

            result = tags.map((tag) => new TagAPI(tag).export());
        } catch (error) {
            const message = (error as Error).message || 'Error getting tags';
            throw new InternalErrorResponse(message, context);
        }
        
        return result;
    }

    public async get(request: HTTPRequest, context: IHTTPContextData) {
        const { id } = request.params;

        if (!id) {
            throw new BadRequestResponse('Property "id" is required', context);
        }
        
        let result: ITagAPI;

        try {
            const tag = await this.tagService.get(Number(id));

            result = new TagAPI(tag).export();

        } catch (error) {
            const message = (error as Error).message || 'Error getting tag';
            throw new InternalErrorResponse(message, context);
        }

        return result;
    }

    public async update(request: HTTPRequest, context: IHTTPContextData) {
        const { id } = request.params;
        const { name, description, color } = request.body;

        if (!id) {
            throw new BadRequestResponse('Property "id" is required', context);
        }

        let result: ITagAPI;

        try {
            const tag = await this.tagService.update(Number(id), { name, description, color });

            result = new TagAPI(tag).export();
        } catch (error) {
            const message = (error as Error).message || 'Error getting tag';
            throw new InternalErrorResponse(message, context);
        }

        return result;
    }

    public async delete(request: HTTPRequest, context: IHTTPContextData) {
        const { id } = request.params;

        if (!id) {
            throw new BadRequestResponse('Property "id" is required', context);
        }

        let result: ITagAPI;

        try {
            const tag = await this.tagService.delete(Number(id));

            result = new TagAPI(tag).export();
        } catch (error) {
            const message = (error as Error).message || 'Error getting tag';
            throw new InternalErrorResponse(message, context);
        }

        return result;
    }
}