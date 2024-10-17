import { inject, injectable } from "inversify";
import { NotFoundError } from "../../crosscutting/common/errors";
import { DbWhereOperands } from "../../crosscutting/database/enums/db-where-operands.enum";
import { IDbQueryWhere } from "../../crosscutting/database/interfaces";
import { IFileModelData } from "../../file/interfaces/data";
import { FileService } from "../../file/services/file.service";
import { IFolderModelData } from "../../folder/interfaces/data";
import { FolderService } from "../../folder/services/folder.service";
import { IHTTPContextData } from "server-over-express";

@injectable()
export class DirectoryService {

    constructor(@inject(FolderService) readonly folderService: FolderService,
                @inject(FileService) readonly fileService: FileService) { }


    public async get(path: string[], context: IHTTPContextData) {
        // Create query to get folders on path
        const folderQuery: IDbQueryWhere<IFolderModelData> = { A: 'parent_id', B: path, op: DbWhereOperands.IN };
        // Get all with this parent ids
        const folders = await this.folderService.list([ folderQuery ], context);
        // Check if path is correct
        path.forEach((folder, index) => {
            if (folder === folders[index].uuid) {
                return;
            }

            throw new NotFoundError('Path is incorrect');
        });
        // Get tags for files
        const tagsIn = new Set(folders.map(({ tags: { include } }) => include).flat());
        const tagsOut = new Set(folders.map(({ tags: { exclude } }) => exclude).flat());
        // Create query to get files on path
        const tagsInQuery: IDbQueryWhere<IFileModelData> = { A: 'tags', B: Array.from(tagsIn), op: DbWhereOperands.IN };
        const tagsOutQuery: IDbQueryWhere<IFileModelData> = { A: 'tags', B: Array.from(tagsOut), op: DbWhereOperands.NOTIN };
        // Get all with this tags
        const files = await this.fileService.list([ tagsInQuery, tagsOutQuery ], context);
        // Return data of directory
        return {
            folders,
            files
        };
    }
}
