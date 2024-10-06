import { IDatabase, IIndexDbQueryWhere, IDbQueryWhere } from "../../database/interfaces";
import { NotFoundError } from "../errors";
import { IEntityData, IEntityModelData } from "../interfaces/data";
import { IEntityRepository } from "../interfaces/services";
import { IEntityModelStatic } from "../interfaces/static";
import { ModelData } from "../types";

export class EntityRepositoryService<D extends IEntityData, M extends IEntityModelData, SM extends IEntityModelStatic<D, M> = IEntityModelStatic<D, M>> implements IEntityRepository<ModelData<M>> {

    constructor(private readonly database: IDatabase<M>,
                private readonly table: string,
                private readonly model: SM) { }

    public async insert(data: M): Promise<M> {
        return this.database.insert(this.table, data);
    }

    public async get(index: IIndexDbQueryWhere<M>): Promise<M> {
        const record = await this.database.get(this.table, index);

        if (!record) {
            throw new NotFoundError('Record not found');
        }

        return record;
    }

    public async list(where: IDbQueryWhere<M>[] = []): Promise<M[]> {
        return this.database.list(this.table, where);
    }

    public async update(index: IIndexDbQueryWhere<M>, patch: M): Promise<M> {
        // Get the original record
        const original = await this.get(index);
        // Create a new record instance
        const record = this.model.fromRepository(original);
        // Update the record
        const updated = new this.model({
            ...record,
            ...patch
        }).toRepository()
        // Update the record in the database
        return this.database.update(this.table, index, updated);
    }

    public async delete(index: IIndexDbQueryWhere<M>): Promise<M> {
        return this.database.delete(this.table, index);
    }
}