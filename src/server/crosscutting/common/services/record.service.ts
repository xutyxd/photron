
import { IDDbQueryWhere, UUIDDbQueryWhere } from "../../database/classes";
import { IIndexDbQueryWhere } from "../../database/interfaces";
import { IDbQueryWhere } from "../../database/interfaces/db-query-where.interface";
import { InternalError } from "../errors/internal.error";
import { IRecordModel } from "../interfaces/record-model.interface";
import { IRecordStatic } from "../interfaces/record-static.interface";
import { IRecord } from "../interfaces/record.interface";
import { IRepository } from "../interfaces/repository.interface";

export class RecordService<S extends IRecordStatic, I extends IRecord, K extends IRecordModel> {

    constructor(private readonly repository: IRepository<I, K>,
                private readonly record: S) { }

    private query = {
        index : (index: number | string) => {
            let query: IIndexDbQueryWhere<K>;

            if (typeof index === 'string') {
                query = new UUIDDbQueryWhere(index);
            } else {
                query = new IDDbQueryWhere(index);
            }

            return query;
        }
    }
    public async create(data: Omit<I, keyof IRecord>) {

        let modelCreated: InstanceType<S>;
        
        try {
            const toInsert = new this.record(data).toModel();
            // Insert the record in the database
            const modelInserted = await this.repository.insert(toInsert);
            // Create a new record instance
            modelCreated = this.record.fromModel(modelInserted);
        } catch (error) {
            throw new InternalError('Error creating record');
        }

        return modelCreated;
    }

    public async get(index: number | string) {
        let record: I;
        // Get query to index record
        const query = this.query.index(index);
        // Get the record from the database
        const recordFounded = await this.repository.get(query);

        try {
            // Create a new record instance
            record = this.record.fromModel(recordFounded);
        } catch (error) {
            throw new InternalError('Error instancianting record from model');
        }

        return record;
    }

    public async list(where?: IDbQueryWhere<K>[]) {
        let records: I[] | undefined;

        try {
            // Get the records from the database
            const recordsFounded = await this.repository.list(where);
            // Create a new record instance
            records = recordsFounded.map((recordFounded) => this.record.fromModel(recordFounded));
        } catch (error) {
            throw new Error('Error getting records');
        }

        return records || [];
    }

    public async update(index: number | string, data: Partial<I>) {
        let record: I;
        // Get query to index record
        const query = this.query.index(index);
        // Update the record in the database
        const recordUpdated = await this.repository.update(query, data);

        try {
            // Create a new record instance
            record = this.record.fromModel(recordUpdated);
        } catch (error) {
            throw new Error('Error instancianting record from model');
        }

        return record;
    }

    public async delete(index: number | string) {
        let record: I;
        // Get query to index record
        const query = this.query.index(index);
        // Delete the record from the database
        const recordDeleted = await this.repository.delete(query);

        try {
            // Create a new record instance
            record = this.record.fromModel(recordDeleted);
        } catch (error) {
            throw new Error('Error deleting record');
        }

        return record;
    }
}