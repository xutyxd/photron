import { inject, injectable } from "inversify";
import { EntityService } from "../../crosscutting/common/services";
import { File } from "../classes/file.class";
import { IFileAPIData, IFileData, IFileModelData } from "../interfaces/data";
import { FileRepository } from "../repository/file.repository";

@injectable()
export class FileService extends EntityService<IFileAPIData, IFileData, IFileModelData> {

    constructor(@inject(FileRepository) readonly fileRepository: FileRepository) {
        super(fileRepository, File);
    }
}