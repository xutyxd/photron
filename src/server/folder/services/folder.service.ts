import { inject, injectable } from "inversify";
import { InternalError } from "../../crosscutting/common/errors/internal.error";
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
                await this.get(data.parentId);
            } catch (error) {
                throw new InternalError('Parent folder not found');
            }
        }

        const folder = await super.create(data);

        return folder;
    }
}