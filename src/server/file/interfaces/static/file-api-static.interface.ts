import { IEntityAPIStatic } from "../../../crosscutting/common/interfaces/static";
import { IFileAPIData, IFileData } from "../data";
import { IFileAPI } from "../dto";

export interface IFileAPIStatic extends IEntityAPIStatic<IFileAPIData, IFileData> {
    new (record: IFileAPIData): IFileAPI;

    fromDomain: (record: IFileData) => IFileAPI;
}