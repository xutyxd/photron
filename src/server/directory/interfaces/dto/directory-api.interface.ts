import { IEntityAPIData } from "../../../crosscutting/common/interfaces/data";
import { IEntityAPI } from "../../../crosscutting/common/interfaces/dto";
import { IDirectoryAPIData, IDirectoryData } from "../data";

export interface IDirectoryAPI extends Omit<IEntityAPI<IDirectoryAPIData, IDirectoryData>, keyof IEntityAPIData> { }
