import { APIData, DomainData, ModelData } from "../../types";
import { IEntityAPIData, IEntityData, IEntityModelData } from "../data";

export interface IEntity<A extends IEntityAPIData, D extends IEntityData, M extends IEntityModelData> extends IEntityData {
    toApi: () => APIData<A>;
    toDomain: () => DomainData<D>;
    toModel: () => ModelData<M>;
}