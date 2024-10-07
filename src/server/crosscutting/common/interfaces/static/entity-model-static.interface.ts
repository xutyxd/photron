import { ModelData, DomainData } from "../../types";
import { IEntityData, IEntityModelData } from "../data";
import { IEntityModel } from "../dto";

export interface IEntityModelStatic<D extends IEntityData, M extends IEntityModelData> {
    new (data: ModelData<M>): IEntityModel<D, M>;

    fromDomain: (data: DomainData<D>) => IEntityModel<D, M>;
    fromRepository: (data: ModelData<M>) => IEntityModel<D, M>;
}