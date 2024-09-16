import { IRecordAPI } from "../interfaces/record-api.interface";
import { IRecord } from "../interfaces/record.interface";

export class RecordAPI implements IRecordAPI {

    public id: number;
    public uuid: string;
    public createdAt: number;
    public updatedAt: number;

    constructor(record: IRecord) {
        this.id = record.id;
        this.uuid = record.uuid;
        this.createdAt = record.createdAt;
        this.updatedAt = record.updatedAt;
    }

    export() {
        return {
            uuid: this.uuid,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}