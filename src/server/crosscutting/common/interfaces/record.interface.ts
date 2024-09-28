import { IRecordModel } from "./record-model.interface";

export interface IRecord {
    id: number;
    uuid: string;
    createdAt: number;
    updatedAt: number;
    version: `${number}.${number}.${number}`;

    toModel(): IRecordModel;
}