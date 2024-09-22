import { IFile } from "./file.interface";

export interface IFileAPI extends Omit<IFile, 'id' | 'ownerId' | 'owner' | 'tags' | 'toModel'> { }