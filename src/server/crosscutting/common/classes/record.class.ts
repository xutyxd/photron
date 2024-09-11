import { IRecordModel } from "../interfaces/record-model.interface";
import { IRecord } from "../interfaces/record.interface";
import { RecordModel } from "./record-model.class";

export class Record implements IRecord {

    public id: number;
    public uuid: string;
    public createdAt: number;
    public updatedAt: number;

    constructor(record: Partial<IRecord>) {
        this.id = record.id || 0;
        this.uuid = record.uuid || crypto.randomUUID();
        this.createdAt = record.createdAt || new Date().getTime();
        this.updatedAt = record.updatedAt || new Date().getTime();
    }

    public toModel(): IRecordModel {
        return new RecordModel(this);
    }

    public static fromModel(record: IRecordModel): Record {
        return new Record({
            id: record.id,
            uuid: record.uuid,
            createdAt: record.created_at,
            updatedAt: record.updated_at
        });
    }
}