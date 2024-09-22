import { inject, injectable } from "inversify";
import { IDatabase } from "../../crosscutting/common/interfaces/database.interface";
import { IFolder } from "../interfaces/folder.interface";
import { IFolderModel } from "../interfaces/folder-model.interface";
import { Folder } from "../classes/folder.class";
import { RecordRepositoryService } from "../../crosscutting/common/services/record-repository.service";

@injectable()
export class FolderRepository extends RecordRepositoryService<IFolder, IFolderModel, typeof Folder> {

    constructor(@inject('IDatabase') private readonly dataBaseService: IDatabase<IFolderModel>) {
        const table = 'folders';
        super(dataBaseService, table, Folder);
    }
}