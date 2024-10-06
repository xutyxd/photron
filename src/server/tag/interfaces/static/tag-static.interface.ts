import { IEntityStatic } from "../../../crosscutting/common/interfaces/static";
import { ITagAPIData, ITagData, ITagModelData } from "../data";

export interface ITagStatic extends IEntityStatic<ITagAPIData, ITagData, ITagModelData> { }