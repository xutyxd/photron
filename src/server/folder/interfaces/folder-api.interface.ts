import { IFolder } from "./folder.interface";

export interface IFolderAPI extends Omit<IFolder, 'id' | 'ownerIndex' | 'toModel'> { }