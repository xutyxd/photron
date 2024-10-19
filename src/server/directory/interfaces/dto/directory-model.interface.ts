import { IEntityModelData } from "../../../crosscutting/common/interfaces/data";
import { IEntityModel } from "../../../crosscutting/common/interfaces/dto";
import { IDirectoryData, IDirectoryModelData } from "../data";

export interface IDirectoryModel extends Omit<IEntityModel<IDirectoryData, IDirectoryModelData>, keyof IEntityModelData> { }
