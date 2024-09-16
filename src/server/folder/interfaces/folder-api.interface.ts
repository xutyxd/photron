import { IFolder } from "./folder.interface";

export interface IFolderAPI extends Omit<IFolder, 'id' | 'ownerId' | 'parentId' | 'filesIds' | 'toModel'> { }