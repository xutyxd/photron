import { inject, injectable } from "inversify";
import { IRecord } from "../../crosscutting/common/interfaces/record.interface";
import { RecordService } from "../../crosscutting/common/services/record.service";
import { Tag } from "../classes/tag.class";
import { ITag } from "../interfaces/tag.interface";
import { TagRepository } from "../repository/tag.repository";

@injectable()
export class TagService extends RecordService<typeof Tag, ITag> {

    constructor(@inject(TagRepository) readonly tagRepository: TagRepository) {
        super(tagRepository, Tag);
    }

    public async create(data: Omit<ITag, keyof IRecord>) {

        const tag = await super.create(data);

        tag.owner = data.owner;
        return tag;
    }
}