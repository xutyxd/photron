import { IEntity } from "../../../crosscutting/common/interfaces/dto";
import { IPhotoAPIData, IPhotoData, IPhotoModelData } from "../data";

export interface IPhoto extends IEntity<IPhotoAPIData, IPhotoData, IPhotoModelData> { }