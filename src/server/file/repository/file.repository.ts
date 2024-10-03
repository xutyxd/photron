import { inject, injectable } from "inversify";
import { IDatabase } from "../../crosscutting/database/interfaces/database.interface";
import { RecordRepositoryService } from "../../crosscutting/common/services/record-repository.service";
import { File } from "../classes/file.class";
import { IFileModel } from "../interfaces/file-model.interface";
import { IFile } from "../interfaces/file.interface";

@injectable()
export class FileRepository extends RecordRepositoryService<IFile, IFileModel, typeof File> {

    constructor(@inject('IDatabase') readonly dataBaseService: IDatabase<IFileModel>) {
        const table = 'files';
        super(dataBaseService, table, File);
    }
}