import { IEntity } from "../../../crosscutting/common/interfaces/dto";
import { IFolderAPIData, IFolderData, IFolderModelData } from "../data";

export interface IFolder extends IEntity<IFolderAPIData, IFolderData, IFolderModelData> { }