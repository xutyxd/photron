import { IRecordModel } from "./record-model.interface";

export interface IDatabase<T extends IRecordModel> {
    // Connection
    connection: {
        connected: boolean;
        open(configuration?: unknown): Promise<void> | void;
        close(): Promise<void>;
    };
    // CRUD
    insert(where: string, data: Omit<T, keyof IRecordModel>): Promise<T>;
    get(where: string, id: T['id']): Promise<T | undefined>;
    update(where: string, id: T['id'], data: Partial<T>): Promise<T>;
    delete(where: string, id: T['id']): Promise<T>;
}