
import { IRecordModel } from "../interfaces/record-model.interface";
import { IRecordStatic } from "../interfaces/record-static.interface";
import { IRecord } from "../interfaces/record.interface";
import { IRepository } from "../interfaces/repository.interface";

export class RecordService<S extends IRecordStatic, I extends IRecord> {

    constructor(private readonly repository: IRepository<I, IRecordModel>,
                private readonly record: S) { }

    public async create(data: Omit<I, keyof IRecord>) {

        let modelCreated: I;
        
        try {
            const toInsert = new this.record(data).toModel();
            // Insert the record in the database
            const modelInserted = await this.repository.insert(toInsert);
            // Create a new record instance
            modelCreated = this.record.fromModel(modelInserted);
        } catch (error) {
            throw new Error('Error creating record');
        }

        return modelCreated;
    }

    public async get(id: I['id']) {
        let record: I;
        // Get the record from the database
        const recordFounded = await this.repository.get(id);

        try {
            // Create a new record instance
            record = this.record.fromModel(recordFounded);
        } catch (error) {
            throw new Error('Error instancianting record from model');
        }

        return record;
    }

    public async list(where?: string[]) {
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

    public async update(id: I['id'], data: Partial<I>) {
        let record: I;
        // Update the record in the database
        const recordUpdated = await this.repository.update(id, data);

        try {
            // Create a new record instance
            record = this.record.fromModel(recordUpdated);
        } catch (error) {
            throw new Error('Error instancianting record from model');
        }

        return record;
    }

    public async delete(id: I['id']) {
        let record: I;
        // Delete the record from the database
        const recordDeleted = await this.repository.delete(id);

        try {
            // Create a new record instance
            record = this.record.fromModel(recordDeleted);
        } catch (error) {
            throw new Error('Error deleting record');
        }

        return record;
    }
}