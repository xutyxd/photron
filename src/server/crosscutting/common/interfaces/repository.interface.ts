import { IDbQueryWhere } from "../../database/interfaces/db-query-where.interface";
import { IRecordModel } from "./record-model.interface";
import { IRecord } from "./record.interface";

export interface IRepository<T extends IRecord, K extends IRecordModel> {
    insert(data: K): Promise<K>;
    get(id: T['id'] | T['uuid']): Promise<K>;
    list(where?: IDbQueryWhere<K>[]): Promise<K[]>;
    update(id: T['id'], data: Partial<T>): Promise<K>;
    delete(id: T['id']): Promise<K>;
}