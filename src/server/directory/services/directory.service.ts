import { inject, injectable } from "inversify";
import { IHTTPContextData } from "server-over-express";
import { NotFoundError } from "../../crosscutting/common/errors";
import { DbWhereOperands } from "../../crosscutting/database/enums/db-where-operands.enum";
import { IDbQueryWhere } from "../../crosscutting/database/interfaces";
import { IFileModelData } from "../../file/interfaces/data";
import { FileService } from "../../file/services/file.service";
import { IFolderModelData } from "../../folder/interfaces/data";
import { FolderService } from "../../folder/services/folder.service";
import { Directory } from "../classes";

@injectable()
export class DirectoryService {

    constructor(@inject(FolderService) readonly folderService: FolderService,
                @inject(FileService) readonly fileService: FileService) { }


    public async get(path: string[], context: IHTTPContextData) {
        // Create query to get folders on path
        let folderQuery: IDbQueryWhere<IFolderModelData> = { A: 'parent_uuid', B: undefined, op: DbWhereOperands.EQUALS };
        // Check if path is not empty
        if (path.length) {
            folderQuery = { A: 'parent_uuid', B: path, op: DbWhereOperands.IN };
        }
        // Create query with owner
        const ownerFolderQuery: IDbQueryWhere<IFolderModelData> = { A: 'owner_uuid', B: context.user.uuid, op: DbWhereOperands.EQUALS };
        // Get all with this parent ids
        const folders = await this.folderService.list([ folderQuery, ownerFolderQuery ], context);
        console.log('Folders: ', folders);
        console.log('Path:', path);
        // Check if path is correct
        path.forEach((folder, index) => {
            if (folder === folders[index]?.parentIndex) {
                return;
            }

            throw new NotFoundError('Path is incorrect');
        });
        // Get tags for files
        const tagsIn = new Set(folders.map(({ tags: { include } }) => include).flat());
        const tagsOut = new Set(folders.map(({ tags: { exclude } }) => exclude).flat());
        // Create query with owner
        const ownerFileQuery: IDbQueryWhere<IFileModelData> = { A: 'owner_uuid', B: context.user.uuid, op: DbWhereOperands.EQUALS };
        // Create query to get files on path
        const tagsInQuery: IDbQueryWhere<IFileModelData> = { A: 'tags', B: Array.from(tagsIn), op: DbWhereOperands.IN };
        const tagsOutQuery: IDbQueryWhere<IFileModelData> = { A: 'tags', B: Array.from(tagsOut), op: DbWhereOperands.NOTIN };
        // Get all with this tags
        const files = await this.fileService.list([ ownerFileQuery, tagsInQuery, tagsOutQuery ], context);
        // Create directory
        const directory = new Directory({ folders, files });
        // Return data of directory
        return directory.toDomain();
    }
}
