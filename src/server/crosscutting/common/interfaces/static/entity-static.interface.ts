import { DomainData, ModelData, APIData } from "../../types";
import { IEntityAPIData, IEntityData, IEntityModelData } from "../data";
import { IEntity } from "../dto";

export interface IEntityStatic<A extends IEntityAPIData, D extends IEntityData, M extends IEntityModelData> {
    new (record: Partial<DomainData<D>>): IEntity<A, D, M>;
    
    fromModel: (record: ModelData<M>) => IEntity<A, D, M>;
    fromAPI: (record: APIData<A>) => IEntity<A, D, M>;
}