import { inject, injectable } from "inversify";
import { EntityRepositoryService } from "../../crosscutting/common/services";
import { IDatabase } from "../../crosscutting/database/interfaces";
import { DirectoryModel } from "../classes";
import { IDirectoryData, IDirectoryModelData } from "../interfaces/data";

@injectable()
export class DirectoryRepository extends EntityRepositoryService<IDirectoryData, IDirectoryModelData> {

    constructor(@inject('IDatabase') readonly dataBaseService: IDatabase<IDirectoryModelData>) {
        const table = 'directory';
        super(dataBaseService, table, DirectoryModel);
    }
}
