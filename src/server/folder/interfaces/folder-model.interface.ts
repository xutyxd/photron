import { IRecordModel } from "../../crosscutting/common/interfaces/record-model.interface";

export interface IFolderModel extends IRecordModel {
    owner_id: number;
    owner: string;
    parent_id?: number;
    parent?: string;
    name: string;
    description: string;
    files_ids: number[];
    files: unknown[];
}