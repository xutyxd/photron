import { IEntityData } from "../../../crosscutting/common/interfaces/data";
import { IFileData } from "../../../file/interfaces/data";
import { IFolderData } from "../../../folder/interfaces/data";

export interface IDirectoryData extends IEntityData {
    folders: IFolderData[];
    files: IFileData[];
}
