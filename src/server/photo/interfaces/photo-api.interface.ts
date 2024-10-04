import { IPhoto } from "./photo.interface";

export interface IPhotoAPI extends Omit<IPhoto, 'id' | 'url_delete' | 'toModel'> { }