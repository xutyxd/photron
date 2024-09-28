import { IRecordModel } from "../../common/interfaces";
import { IDbQueryWhere } from "./db-query-where.interface";
import { IIndexDbQueryWhere } from "./id-db-query-where.interface";

export interface IDatabase<T extends IRecordModel> {
    // Connection
    connection: {
        connected: boolean;
        open(configuration?: unknown): Promise<void> | void;
        close(): Promise<void>;
    };
    // CRUD
    insert(from: string, data: Omit<T, keyof IRecordModel>): Promise<T>;
    get(from: string, index: IIndexDbQueryWhere<T>): Promise<T | undefined>;
    list(from: string, where: IDbQueryWhere<T>[]): Promise<T[]>;
    update(from: string, index: IIndexDbQueryWhere<T>, data: Partial<T>): Promise<T>;
    delete(from: string, index: IIndexDbQueryWhere<T>): Promise<T>;
}