import { IFileData } from "../../../file/interfaces/data";
import { IFolderData } from "../../../folder/interfaces/data";

export interface IDirectoryData {
    folders: IFolderData[];
    files: IFileData[];
}
