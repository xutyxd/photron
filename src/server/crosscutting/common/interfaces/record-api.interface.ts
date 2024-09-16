import { IRecord } from "./record.interface";

export interface IRecordAPI extends Omit<IRecord, 'id' | 'toModel'> { }