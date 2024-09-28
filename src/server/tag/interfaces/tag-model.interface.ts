import { IRecordModel } from "../../crosscutting/common/interfaces/record-model.interface";

export interface ITagModel extends IRecordModel {
    owner_id: string;
    owner?: string;
    name: string;
    description?: string;
    color?: string;
}