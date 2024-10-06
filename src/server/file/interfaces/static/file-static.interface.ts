import { IEntityStatic } from "../../../crosscutting/common/interfaces/static";
import { IFileAPIData, IFileData, IFileModelData } from "../data";

export interface IFileStatic extends IEntityStatic<IFileAPIData, IFileData, IFileModelData> { }