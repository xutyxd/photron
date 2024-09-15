import { inject, injectable } from "inversify";
import { Folder } from "../classes/folder.class";
import { IFolder } from "../interfaces/folder.interface";
import { FolderRepository } from "../repository/folder.repository";
import { RecordService } from "../../crosscutting/common/services/record.service";
import { IRecord } from "../../crosscutting/common/interfaces/record.interface";

@injectable()
export class FolderService extends RecordService<typeof Folder, IFolder> {

    constructor(@inject(FolderRepository) readonly folderRepository: FolderRepository) {
        super(folderRepository, Folder);
    }

    public async create(data: Omit<IFolder, keyof IRecord>) {
        // Check if the parent folder exists
        if (data.parentId) {
            const parent = await this.folderRepository.get(data.parentId);
            
            if (!parent) {
                throw new Error('Parent folder not found');
            }
        }

        return super.create(data);
    }
}