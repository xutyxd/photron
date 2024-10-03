import { inject, injectable } from "inversify";
import { NotFoundError } from "../../crosscutting/common/errors";
import { RecordService } from "../../crosscutting/common/services/record.service";
import { Folder } from "../classes/folder.class";
import { IFolder, IFolderModel } from "../interfaces";
import { FolderRepository } from "../repository/folder.repository";
import { PartialFolder } from "../types/partial-folder.type";

@injectable()
export class FolderService extends RecordService<typeof Folder, IFolder, IFolderModel> {

    constructor(@inject(FolderRepository) readonly folderRepository: FolderRepository) {
        super(folderRepository, Folder);
    }

    public async create(data: PartialFolder) {
        // Check if the parent folder exists
        if (data.parentIndex) {
            try {
                await this.get(data.parentIndex);
            } catch (error) {
                throw new NotFoundError('Parent folder not found');
            }
        }

        return await super.create(data);
    }
}