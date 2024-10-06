import { IEntity } from "../../../crosscutting/common/interfaces/dto";
import { IFileAPIData, IFileData, IFileModelData } from "../data";

export interface IFile extends IEntity<IFileAPIData, IFileData, IFileModelData> { }