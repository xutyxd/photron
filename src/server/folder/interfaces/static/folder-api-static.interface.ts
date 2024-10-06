import { IEntityAPIStatic } from "../../../crosscutting/common/interfaces/static";
import { IFolderAPIData, IFolderData } from "../data";
import { IFolderAPI } from "../dto";

export interface IFolderAPIStatic extends IEntityAPIStatic<IFolderAPIData, IFolderData> {
    new (entity: IFolderAPIData): IFolderAPI;

    fromDomain(entity: IFolderData): IFolderAPI;
}