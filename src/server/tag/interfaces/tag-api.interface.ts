import { ITag } from "./tag.interface";

export interface ITagAPI extends Omit<ITag, 'id' | 'ownerIndex' | 'toModel'> { }