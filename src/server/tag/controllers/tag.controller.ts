import { inject, injectable } from "inversify";
import { HTTPRequest, IHTTPContextData, IHTTPController } from "server-over-express";
import { EntityController } from "../../crosscutting/common";
import { TagAPI } from "../classes";
import { ITagAPIData, ITagData, ITagModelData } from "../interfaces/data";
import { ITagAPIStatic } from "../interfaces/static";
import { tagBase, tagCreate, tagUpdate } from "../schemas";
import { TagService } from "../services/tag.service";

@injectable()
export class TagController extends EntityController<ITagAPIData, ITagData, ITagModelData, ITagAPIStatic> implements IHTTPController {

    public path = 'tags';

    constructor(@inject(TagService) private readonly tagService: TagService) {
        const schemas = {
            base: tagBase,
            create: tagCreate,
            update: tagUpdate,
            ref: '#/components/schemas/tag-base.request'
        };

        super(tagService, schemas, TagAPI);
    }

    public async create(request: HTTPRequest, context: IHTTPContextData) {

        const tag = await super.create(request, context);
        // Add owner to tag
        tag.owner = context.user.name;

        return tag;
    }

    public async list(request: HTTPRequest, context: IHTTPContextData) {

        const tags = await super.list(request, context);
        // Add owner to tags
        tags.forEach((tag) => tag.owner = context.user.name);

        return tags;
    }

    public async get(request: HTTPRequest, context: IHTTPContextData) {
        const tag = await super.get(request, context);
        // Add owner to tag
        tag.owner = context.user.name;

        return tag;
    }

    public async update(request: HTTPRequest, context: IHTTPContextData) {
        const tag = await super.update(request, context);
        // Add owner to tag
        tag.owner = context.user.name;

        return tag;
    }

    public async delete(request: HTTPRequest, context: IHTTPContextData) {
        const tag = await super.delete(request, context);
        // Add owner to tag
        tag.owner = context.user.name;

        return tag;
    }
}