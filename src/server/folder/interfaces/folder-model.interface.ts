import { IRecordModel } from "../../crosscutting/common/interfaces/record-model.interface";
import { IFileModel } from "../../file/interfaces/file-model.interface";
import { ITagModel } from "../../tag/interfaces/tag-model.interface";

export interface IFolderModel extends IRecordModel {
    owner_id: number;
    owner: string;
    parent_id?: number;
    parent?: string;
    name: string;
    description: string;
    files_ids: number[];
    files: IFileModel[];
    tags_include: number[];
    tags_exclude: number[];
    tags?: {
        include: ITagModel[];
        exclude: ITagModel[];
    };
}