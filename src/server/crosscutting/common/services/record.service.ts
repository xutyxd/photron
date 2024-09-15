
import { IRecordModel } from "../interfaces/record-model.interface";
import { IRecordStatic } from "../interfaces/record-static.interface";
import { IRecord } from "../interfaces/record.interface";
import { IRepository } from "../interfaces/repository.interface";

export class RecordService<S extends IRecordStatic, I extends IRecord> {

    constructor(private readonly repository: IRepository<I, IRecordModel>,
                private readonly model: S) { }

    public async create(data: Omit<I, keyof IRecord>) {

        let modelCreated: I;
        
        try {

            const toInsert = new this.model(data).toModel();
            // Insert the record in the database
            const modelInserted = await this.repository.insert(toInsert);
            // Create a new record instance
            modelCreated = this.model.fromModel(modelInserted);
        } catch (error) {
            console.log('Error creating record: ', error);
            throw new Error('Error creating record');
        }

        return modelCreated;
    }

    public async get(id: I['id']) {
        let record: I | undefined;

        try {
            // Get the record from the database
            const recordFounded = await this.repository.get(id);
            // Create a new record instance
            record = recordFounded && this.model.fromModel(recordFounded);
        } catch (error) {
            console.log('Error getting record: ', error);
            throw new Error('Error getting record');
        }

        return record;
    }

    public async list(where?: string[]) {
        let records: I[] | undefined;

        try {
            // Get the records from the database
            const recordsFounded = await this.repository.list(where);
            // Create a new record instance
            records = recordsFounded.map((recordFounded) => this.model.fromModel(recordFounded));
        } catch (error) {
            console.log('Error getting records: ', error);
            throw new Error('Error getting records');
        }

        return records || [];
    }

    public async update(id: I['id'], data: Partial<I>) {
        let record: I | undefined;

        try {
            // Update the record in the database
            const recordUpdated = await this.repository.update(id, data);
            // Create a new record instance
            record = recordUpdated && this.model.fromModel(recordUpdated);
        } catch (error) {
            console.log('Error updating record: ', error);
            throw new Error('Error updating record');
        }

        return record;
    }

    public async delete(id: I['id']) {
        let record: I | undefined;

        try {
            // Delete the record from the database
            const recordDeleted = await this.repository.delete(id);
            // Create a new record instance
            record = recordDeleted && this.model.fromModel(recordDeleted);
        } catch (error) {
            console.log('Error deleting record: ', error);
            throw new Error('Error deleting record');
        }

        return record;
    }
}