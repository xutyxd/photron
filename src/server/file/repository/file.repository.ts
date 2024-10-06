import { inject, injectable } from "inversify";
import { IDatabase } from "../../crosscutting/database/interfaces";
import { EntityRepositoryService } from "../../crosscutting/common/services";
import { IFileData, IFileModelData } from "../interfaces/data";
import { FileModel } from "../classes";

@injectable()
export class FileRepository extends EntityRepositoryService<IFileData, IFileModelData> {

    constructor(@inject('IDatabase') readonly dataBaseService: IDatabase<IFileModelData>) {
        const table = 'files';
        super(dataBaseService, table, FileModel);
    }
}