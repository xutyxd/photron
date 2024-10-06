import { IEntityAPIStatic } from "../../../crosscutting/common/interfaces/static";
import { ITagAPIData, ITagData } from "../data";
import { ITagAPI } from "../dto";

export interface ITagAPIStatic extends IEntityAPIStatic<ITagAPIData, ITagData>{
    new (entity: ITagAPIData): ITagAPI;

    fromDomain(entity: ITagData): ITagAPI;
}