import { inject, injectable } from "inversify";
import { IHTTPController } from "server-over-express";
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
}