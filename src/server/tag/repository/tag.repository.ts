import { inject, injectable } from "inversify";
import { IDatabase } from "../../crosscutting/common/interfaces/database.interface";
import { RecordRepositoryService } from "../../crosscutting/common/services/record-repository.service";
import { Tag } from "../classes/tag.class";
import { ITagModel } from "../interfaces/tag-model.interface";
import { ITag } from "../interfaces/tag.interface";

@injectable()
export class TagRepository extends RecordRepositoryService<ITag, ITagModel, typeof Tag> {

    constructor(@inject('IDatabase') readonly dataBaseService: IDatabase<ITagModel>) {
        const table = 'tags';
        super(dataBaseService, table, Tag);
    }
}