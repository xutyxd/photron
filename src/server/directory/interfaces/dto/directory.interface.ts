import { IEntity } from "../../../crosscutting/common/interfaces/dto";
import { IDirectoryAPIData, IDirectoryData, IDirectoryModelData } from "../data";

export interface IDirectory extends IEntity<IDirectoryAPIData, IDirectoryData, IDirectoryModelData> { }
