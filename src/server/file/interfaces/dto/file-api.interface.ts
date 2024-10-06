import { IEntityAPI } from "../../../crosscutting/common/interfaces/dto";
import { IFileAPIData, IFileData } from "../data";

export interface IFileAPI extends IEntityAPI<IFileAPIData, IFileData> { }