import { IRecord } from "../../crosscutting/common/interfaces/record.interface";
import { IFile } from "../../file/interfaces/file.interface";
import { ITag } from "../../tag/interfaces/tag.interface";

export interface IFolder extends IRecord {
    ownerId: string;
    owner?: string;
    parentId?: string;
    parent?: string;
    name: string;
    description?: string;
    files: IFile[];
    tags: {
        include: ITag[];
        exclude: ITag[];
    }
}