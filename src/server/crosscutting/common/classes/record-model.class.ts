import { IRecordModel } from "../interfaces/record-model.interface";
import { IRecord } from "../interfaces/record.interface";

export class RecordModel implements IRecordModel {

    public id: number;
    public uuid: string;
    public created_at: number;
    public updated_at: number;

    constructor(record: Partial<IRecord>) {
        this.id = record.id || 0;
        this.uuid = record.uuid || crypto.randomUUID();
        this.created_at = record.createdAt || new Date().getTime();
        this.updated_at = record.updatedAt || new Date().getTime();
    }
}