import { IRecordModel } from "../../crosscutting/common/interfaces/record-model.interface";

export interface IFileModel extends IRecordModel {
    owner_id: number;
    owner: string;
    name: string;
    description?: string;
    size: number;
    type: string;
    tags: number[];
    deleted: boolean;
}