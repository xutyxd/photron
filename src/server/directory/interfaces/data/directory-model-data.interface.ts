import { IEntityModelData } from "../../../crosscutting/common/interfaces/data";
import { IFileModelData } from "../../../file/interfaces/data";
import { IFolderModelData } from "../../../folder/interfaces/data";

export interface IDirectoryModelData extends IEntityModelData {
    folders: IFolderModelData[];
    files: IFileModelData[];
}
