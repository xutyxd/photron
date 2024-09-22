import { inject, injectable } from "inversify";
import { IDatabase } from "../../crosscutting/database/interfaces/database.interface";
import { RecordRepositoryService } from "../../crosscutting/common/services/record-repository.service";
import { Folder } from "../classes/folder.class";
import { IFolderModel } from "../interfaces/folder-model.interface";
import { IFolder } from "../interfaces/folder.interface";

@injectable()
export class FolderRepository extends RecordRepositoryService<IFolder, IFolderModel, typeof Folder> {

    constructor(@inject('IDatabase') readonly dataBaseService: IDatabase<IFolderModel>) {
        const table = 'folders';
        super(dataBaseService, table, Folder);
    }
}