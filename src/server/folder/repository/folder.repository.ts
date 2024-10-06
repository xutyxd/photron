import { inject, injectable } from "inversify";
import { EntityRepositoryService } from "../../crosscutting/common";
import { IDatabase } from "../../crosscutting/database/interfaces";
import { FolderModel } from "../classes";
import { IFolderData, IFolderModelData } from "../interfaces/data";

@injectable()
export class FolderRepository extends EntityRepositoryService<IFolderData, IFolderModelData> {

    constructor(@inject('IDatabase') readonly dataBaseService: IDatabase<IFolderModelData>) {
        const table = 'folders';
        super(dataBaseService, table, FolderModel);
    }
}