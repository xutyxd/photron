import { inject, injectable } from "inversify";
import { IRecord } from "../../crosscutting/common/interfaces/record.interface";
import { RecordService } from "../../crosscutting/common/services/record.service";
import { Folder } from "../classes/folder.class";
import { IFolderModel } from "../interfaces/folder-model.interface";
import { IFolder } from "../interfaces/folder.interface";
import { FolderRepository } from "../repository/folder.repository";

@injectable()
export class FolderService extends RecordService<typeof Folder, IFolder, IFolderModel> {

    constructor(@inject(FolderRepository) readonly folderRepository: FolderRepository) {
        super(folderRepository, Folder);
    }

    public async create(data: Omit<IFolder, keyof IRecord>) {
        // Check if the parent folder exists
        if (data.parentId) {
            try {
                const parent = await this.folderRepository.get(data.parentId);

                data.parent = parent.uuid;
            } catch (error) {
                throw new Error('Parent folder not found');
            }
        }

        const folder = await super.create(data);

        folder.owner = data.owner;
        return folder;
    }
}