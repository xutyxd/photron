import { inject, injectable } from "inversify";
import { EntityService } from "../../crosscutting/common";
import { Tag } from "../classes";
import { ITagAPIData, ITagData, ITagModelData } from "../interfaces/data";
import { ITagStatic } from "../interfaces/static";
import { TagRepository } from "../repository/tag.repository";

@injectable()
export class TagService extends EntityService<ITagAPIData, ITagData, ITagModelData, ITagStatic> {

    constructor(@inject(TagRepository) readonly tagRepository: TagRepository) {
        super(tagRepository, Tag);
    }
}