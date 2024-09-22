import { injectable } from "inversify";
import { IDatabase } from "../interfaces/database.interface";
import { IRecordModel } from "../../common/interfaces/record-model.interface";
import { IDbQueryWhere } from "../interfaces/db-query-where.interface";

@injectable()
export class MemoryDatabaseService<T extends IRecordModel> implements IDatabase<T & IRecordModel> {

    private connected: boolean = false;
    private data: { [from: string]: T[] | undefined } = {};

    constructor() { }

    public connection = {
        get connected(): boolean {
            return this.connected;
        },

        open: async () => {
            this.connected = true
        },
        close: async () => {
            this.connected = false
        }
    }

    public async insert(from: string, data: T): Promise<T> {

        if (!this.connected) {
            throw new Error('Database not connected');
        }

        this.data[from] ??= [];
        this.data[from].push({
            ...data,
            id: this.data[from].length + 1
        });

        return data;
    }

    public async get(from: string, id: T['id']): Promise<T | undefined> {

        if (!this.connected) {
            throw new Error('Database not connected');
        }

        return this.data[from]?.find((item) => item.id === id);
    }

    public async list(from: string, wheres: IDbQueryWhere<T>[]): Promise<T[]> {

        if (!this.connected) {
            throw new Error('Database not connected');
        }

        return this.data[from]?.filter((item) => wheres.every((where) => item)) || [];
    }

    public async update(from: string, id: T['id'], data: T): Promise<T> {

        if (!this.connected) {
            throw new Error('Database not connected');
        }

        const element = await this.get(from, id);

        // Find index of the element
        const index = this.data[from]?.findIndex((item) => item.id === id);

        if (!this.data[from] || !element || index === undefined) {
            throw new Error('Item not found');
        }

        // Update the element avoiding mutating the original id
        this.data[from][index] = {
            ...element,
            ...data,
            id: element.id
        };

        return data;
    }

    public async delete(from: string, id: T['id']): Promise<T> {

        if (!this.connected) {
            throw new Error('Database not connected');
        }

        const element = await this.get(from, id);
        // Find index of the element
        const index = this.data[from]?.findIndex((item) => item.id === id);

        if (!this.data[from] || !element || index === undefined) {
            throw new Error('Item not found');
        }
        // Delete the element
        this.data[from].splice(index, 1);

        return element;
    }
}