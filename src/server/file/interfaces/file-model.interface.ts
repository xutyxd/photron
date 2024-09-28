import { IRecordModel } from "../../crosscutting/common/interfaces/record-model.interface";

export interface IFileModel extends IRecordModel {
    owner_id: string;
    owner: string;
    name: string;
    description?: string;
    size: number;
    type: string;
    tags: string[];
    deleted: boolean;
}