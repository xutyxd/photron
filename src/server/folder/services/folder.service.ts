import { inject, injectable } from "inversify";
import { Folder } from "../classes/folder.class";
import { IFolder } from "../interfaces/folder.interface";
import { FolderRepository } from "../repository/folder.repository";
import { RecordService } from "../../crosscutting/common/services/record.service";

@injectable()
export class FolderService extends RecordService<typeof Folder, IFolder> {

    constructor(@inject(FolderRepository) readonly folderRepository: FolderRepository) {
        super(folderRepository, Folder);
    }
}