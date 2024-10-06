import { inject, injectable } from "inversify";
import { EntityRepositoryService } from "../../crosscutting/common/services";
import { IDatabase } from "../../crosscutting/database/interfaces";
import { FileModel } from "../classes";
import { IFileData, IFileModelData } from "../interfaces/data";

@injectable()
export class FileRepository extends EntityRepositoryService<IFileData, IFileModelData> {

    constructor(@inject('IDatabase') readonly dataBaseService: IDatabase<IFileModelData>) {
        const table = 'files';
        super(dataBaseService, table, FileModel);
    }
}