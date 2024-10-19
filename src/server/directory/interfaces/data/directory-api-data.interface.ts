import { IFileAPIData } from "../../../file/interfaces/data";
import { IFolderAPIData } from "../../../folder/interfaces/data";

export interface IDirectoryAPIData {
    folders: IFolderAPIData[];
    files: IFileAPIData[];
}
