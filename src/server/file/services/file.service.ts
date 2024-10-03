import { inject, injectable } from "inversify";
import { RecordService } from "../../crosscutting/common/services/record.service";
import { File } from "../classes/file.class";
import { IFile, IFileModel } from "../interfaces";
import { FileRepository } from "../repository/file.repository";

@injectable()
export class FileService extends RecordService<typeof File, IFile, IFileModel> {

    constructor(@inject(FileRepository) readonly fileRepository: FileRepository) {
        super(fileRepository, File);
    }
}