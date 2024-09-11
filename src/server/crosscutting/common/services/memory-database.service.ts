import { injectable } from "inversify";
import { IDatabase } from "../interfaces/database.interface";
import { IRecordModel } from "../interfaces/record-model.interface";

@injectable()
export class MemoryDatabaseService<T extends IRecordModel> implements IDatabase<T & IRecordModel> {

    private connected: boolean = false;
    private data: { [where: string]: T[] } = {};

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

    public async insert(where: string, data: T): Promise<T> {

        if (!this.connected) {
            throw new Error('Database not connected');
        }

        this.data[where] ??= [];
        this.data[where].push({
            ...data,
            id: this.data[where].length + 1
        });

        return data;
    }

    public async get(where: string, id: T['id']): Promise<T | undefined> {

        if (!this.connected) {
            throw new Error('Database not connected');
        }

        console.log('Data: ', this.data[where]);
        return this.data[where].find((item) => item.id === id);
    }

    public async update(where: string, id: T['id'], data: T): Promise<T> {

        if (!this.connected) {
            throw new Error('Database not connected');
        }

        const element = await this.get(where, id);

        if (!element) {
            throw new Error('Item not found');
        }
        // Find index of the element
        const index = this.data[where].findIndex((item) => item.id === id);
        // Update the element avoiding mutating the original id
        this.data[where][index] = {
            ...element,
            ...data,
            id: element.id
        };

        return data;
    }

    public async delete(where: string, id: T['id']): Promise<T> {

        if (!this.connected) {
            throw new Error('Database not connected');
        }

        const element = await this.get(where, id);

        if (!element) {
            throw new Error('Item not found');
        }
        // Find index of the element
        const index = this.data[where].findIndex((item) => item.id === id);
        // Delete the element
        this.data[where].splice(index, 1);

        return element;
    }
}