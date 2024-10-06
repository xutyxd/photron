import { APIData, DomainData } from "../../types";
import { IEntityAPIData, IEntityData } from "../data";

export interface IEntityAPI<A extends IEntityAPIData, D extends IEntityData> extends IEntityAPIData {
    toApi: () => APIData<A>;
    toDomain: () => DomainData<D>;
}