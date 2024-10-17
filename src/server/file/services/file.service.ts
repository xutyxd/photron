import { inject, injectable } from "inversify";
import { EntityService } from "../../crosscutting/common/services";
import { File } from "../classes/file.class";
import { IFileAPIData, IFileData, IFileModelData } from "../interfaces/data";
import { FileRepository } from "../repository/file.repository";
import { IHTTPContextData } from "server-over-express";
import { IAuth } from "../../auth/interfaces/auth.interface";

@injectable()
export class FileService extends EntityService<IFileAPIData, IFileData, IFileModelData> {

    constructor(@inject(FileRepository) readonly fileRepository: FileRepository) {
        super(fileRepository, File);
    }

    public async create(data: IFileData, context: IHTTPContextData) {
        const user = context.user as IAuth;
        return await super.create({ ...data, ownerIndex: user.uuid });
    }
}