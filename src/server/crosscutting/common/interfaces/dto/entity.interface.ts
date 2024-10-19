import { IEntityAPIData, IEntityData, IEntityModelData } from "../data";

export interface IEntity<A extends IEntityAPIData, D extends IEntityData, M extends IEntityModelData> extends IEntityData {
    toApi: () => A;
    toDomain: () => D;
    toModel: () => M;
}