import { IRecordModel } from "../../crosscutting/common/interfaces/record-model.interface";

export interface IFolderModel extends IRecordModel {
    owner_id: string;
    parent_id?: string;
    name: string;
    description: string;
    files_ids: string[];
    tags_include: string[];
    tags_exclude: string[];
}