import { inject, injectable } from "inversify";
import { File } from "../classes/file.class";
import { FileRepository } from "../repository/file.repository";
import { EntityService } from "../../crosscutting/common/services";
import { IFileAPIData, IFileData, IFileModelData } from "../interfaces/data";
import { IFileStatic } from "../interfaces/static/file-static.interface";

@injectable()
export class FileService extends EntityService<IFileAPIData, IFileData, IFileModelData, IFileStatic> {

    constructor(@inject(FileRepository) readonly fileRepository: FileRepository) {
        super(fileRepository, File);
    }
}