import { IEntityAPIData, IEntityData } from "../data";

export interface IEntityAPI<A extends IEntityAPIData, D extends IEntityData> extends IEntityAPIData {
    toApi: () => A;
    toDomain: () => D;
}