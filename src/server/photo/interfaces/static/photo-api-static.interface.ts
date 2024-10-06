import { IEntityAPIStatic } from "../../../crosscutting/common/interfaces/static";
import { IPhotoAPIData, IPhotoData } from "../data";
import { IPhotoAPI } from "../dto";

export interface IPhotoAPIStatic extends IEntityAPIStatic<IPhotoAPIData, IPhotoData>{
    new (entity: IPhotoAPIData): IPhotoAPI;

    fromDomain(entity: IPhotoData): IPhotoAPI;
}