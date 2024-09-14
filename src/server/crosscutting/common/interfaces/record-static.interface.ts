import { IRecordModel } from "./record-model.interface";

export interface IRecordStatic {
    new (...args: any[]): any;

    fromModel(data: IRecordModel): InstanceType<this>;
}