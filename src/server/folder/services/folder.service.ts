import { inject, injectable } from "inversify";
import { EntityService } from "../../crosscutting/common";
import { NotFoundError } from "../../crosscutting/common/errors";
import { Folder } from "../classes";
import { IFolderAPIData, IFolderData, IFolderModelData } from "../interfaces/data";
import { IFolderStatic } from "../interfaces/static";
import { FolderRepository } from "../repository/folder.repository";

@injectable()
export class FolderService extends EntityService<IFolderAPIData, IFolderData, IFolderModelData, IFolderStatic> {

    constructor(@inject(FolderRepository) readonly folderRepository: FolderRepository) {
        super(folderRepository, Folder);
    }

    public async create(data: IFolderData) {
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