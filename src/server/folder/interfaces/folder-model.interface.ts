import { IRecordModel } from "../../crosscutting/common/interfaces/record-model.interface";

export interface IFolderModel extends IRecordModel {
    owner_id: number;
    parent_id?: number;
    name: string;
    description: string;
}