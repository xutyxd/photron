import { IEntityData, IEntityModelData } from "../data";

export interface IEntityModel<D extends IEntityData, M extends IEntityModelData> extends IEntityModelData {
    toDomain: () => D;
    toRepository: () => M;
}