import { IDbQueryWhere, IIndexDbQueryWhere } from "../../database/interfaces";
import { IRecordModel } from "./record-model.interface";
import { IRecord } from "./record.interface";

export interface IRepository<T extends IRecord, K extends IRecordModel> {
    insert(data: K): Promise<K>;
    get(index: IIndexDbQueryWhere<K>): Promise<K>;
    list(where?: IDbQueryWhere<K>[]): Promise<K[]>;
    update(index: IIndexDbQueryWhere<K>, data: Partial<T>): Promise<K>;
    delete(index: IIndexDbQueryWhere<K>): Promise<K>;
}