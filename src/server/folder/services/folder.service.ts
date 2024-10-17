import { inject, injectable } from "inversify";
import { IHTTPContextData } from "server-over-express";
import { IAuth } from "../../auth/interfaces/auth.interface";
import { EntityService } from "../../crosscutting/common";
import { NotFoundError } from "../../crosscutting/common/errors";
import { Folder } from "../classes";
import { IFolderAPIData, IFolderData, IFolderModelData } from "../interfaces/data";
import { FolderRepository } from "../repository/folder.repository";

@injectable()
export class FolderService extends EntityService<IFolderAPIData, IFolderData, IFolderModelData> {

    constructor(@inject(FolderRepository) private readonly folderRepository: FolderRepository) {
        super(folderRepository, Folder);
    }

    public async create(data: IFolderData, context: IHTTPContextData) {
        // Check if the parent folder exists
        if (data.parentIndex) {
            try {
                await this.get(data.parentIndex, context);
            } catch (error) {
                throw new NotFoundError('Parent folder not found');
            }
        }
        const user = context.user as IAuth;
        return await super.create({ ...data, ownerIndex: user.uuid }, context);
    }
}