import { IEntityAPIData } from "../../../crosscutting/common/interfaces/data";
import { IFileAPIData } from "../../../file/interfaces/data";
import { IFolderAPIData } from "../../../folder/interfaces/data";

export interface IDirectoryAPIData extends IEntityAPIData {
    folders: IFolderAPIData[];
    files: IFileAPIData[];
}
