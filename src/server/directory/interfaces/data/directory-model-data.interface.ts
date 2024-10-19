import { IFileModelData } from "../../../file/interfaces/data";
import { IFolderModelData } from "../../../folder/interfaces/data";

export interface IDirectoryModelData {
    folders: IFolderModelData[];
    files: IFileModelData[];
}
