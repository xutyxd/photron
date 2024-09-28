
import { IDatabase } from "../../database/interfaces/database.interface";
import { IDbQueryWhere } from "../../database/interfaces/db-query-where.interface";
import { NotFoundError } from "../errors/not-found.error";
import { IRecord, IRecordModel, IRecordStatic, IRepository } from "../interfaces";

export class RecordRepositoryService<T extends IRecord, K extends IRecordModel, S extends IRecordStatic> implements IRepository<T, K> {

    constructor(private readonly database: IDatabase<K>,
                private readonly table: string,
                private readonly record: S) { }

    public insert(data: K): Promise<K> {
        return this.database.insert(this.table, data);
    }

    public async get(id: T['id']): Promise<K> {

        const record = await this.database.get(this.table, id);

        if (!record) {
            throw new NotFoundError('Record not found');
        }

        return record;
    }

    public async list(where: IDbQueryWhere<K>[] = []): Promise<K[]> {
        return this.database.list(this.table, where);
    }

    public async update(id: T['id'], patch: Partial<T>): Promise<K> {
        // Get the original record
        const original = await this.get(id);
        // Create a new record instance
        const record = this.record.fromModel(original);
        // Update the record
        const updated = new this.record({
            ...record,
            ...patch
        }).toModel();
        // Update the record in the database
        return this.database.update(this.table, id, updated);
    }

    public async delete(id: T['id']): Promise<K> {
        return this.database.delete(this.table, id);
    }
}