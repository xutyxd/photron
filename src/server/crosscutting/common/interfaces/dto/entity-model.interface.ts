import { DomainData, ModelData } from "../../types";
import { IEntityData, IEntityModelData } from "../data";

export interface IEntityModel<D extends IEntityData, M extends IEntityModelData> extends IEntityModelData {
    toDomain: () => DomainData<D>;
    toRepository: () => ModelData<M>;
}