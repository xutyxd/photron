import { IRecordModel } from "./record-model.interface";
import { IRecord } from "./record.interface";

export interface IRepository<T extends IRecord, K extends IRecordModel> {
    insert(data: K): Promise<K>;
    get(id: T['id']): Promise<K | undefined>;
    list(where?: string[]): Promise<K[]>;
    update(id: T['id'], data: Partial<K>): Promise<K>;
    delete(id: T['id']): Promise<K>;
}