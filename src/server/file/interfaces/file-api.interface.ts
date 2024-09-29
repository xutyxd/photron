import { IFile } from "./file.interface";

export interface IFileAPI extends Omit<IFile, 'id' | 'ownerIndex' | 'owner' | 'tags' | 'toModel'> { }