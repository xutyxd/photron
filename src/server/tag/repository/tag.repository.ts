import { inject, injectable } from "inversify";
import { EntityRepositoryService } from "../../crosscutting/common";
import { IDatabase } from "../../crosscutting/database/interfaces";
import { TagModel } from "../classes";
import { ITagData, ITagModelData } from "../interfaces/data";

@injectable()
export class TagRepository extends EntityRepositoryService<ITagData, ITagModelData> {

    constructor(@inject('IDatabase') readonly dataBaseService: IDatabase<ITagModelData>) {
        const table = 'tags';
        super(dataBaseService, table, TagModel);
    }
}