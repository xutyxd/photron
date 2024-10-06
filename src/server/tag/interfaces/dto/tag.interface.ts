import { IEntity } from "../../../crosscutting/common/interfaces/dto";
import { ITagAPIData, ITagData, ITagModelData } from "../data";

export interface ITag extends IEntity<ITagAPIData, ITagData, ITagModelData> { }