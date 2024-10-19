import { IEntityData } from "../../../crosscutting/common/interfaces/data";
import { IEntity } from "../../../crosscutting/common/interfaces/dto";
import { IDirectoryAPIData, IDirectoryData, IDirectoryModelData } from "../data";

export interface IDirectory extends Omit<IEntity<IDirectoryAPIData, IDirectoryData, IDirectoryModelData>, keyof IEntityData> { }
