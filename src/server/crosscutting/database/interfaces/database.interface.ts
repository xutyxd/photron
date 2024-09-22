import { IRecordModel } from "../../common/interfaces/record-model.interface";
import { IDbQueryWhere } from "./db-query-where.interface";

export interface IDatabase<T extends IRecordModel> {
    // Connection
    connection: {
        connected: boolean;
        open(configuration?: unknown): Promise<void> | void;
        close(): Promise<void>;
    };
    // CRUD
    insert(from: string, data: Omit<T, keyof IRecordModel>): Promise<T>;
    get(from: string, id: T['id']): Promise<T | undefined>;
    list(from: string, where: IDbQueryWhere<T>[]): Promise<T[]>;
    update(from: string, id: T['id'], data: Partial<T>): Promise<T>;
    delete(from: string, id: T['id']): Promise<T>;
}