import { IRecordModel } from "../../crosscutting/common/interfaces/record-model.interface";

export interface ITagModel extends IRecordModel {
    owner_id: number;
    owner?: string;
    name: string;
    description?: string;
    color?: string;
}