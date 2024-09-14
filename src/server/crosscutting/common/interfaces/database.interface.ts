import { IRecordModel } from "./record-model.interface";

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
    list(from: string, where: string[]): Promise<T[]>;
    update(from: string, id: T['id'], data: Partial<T>): Promise<T>;
    delete(from: string, id: T['id']): Promise<T>;
}