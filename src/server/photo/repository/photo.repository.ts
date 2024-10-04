import { inject, injectable } from "inversify";
import { IDatabase } from "../../crosscutting/database/interfaces/database.interface";
import { RecordRepositoryService } from "../../crosscutting/common/services/record-repository.service";
import { Photo } from "../classes/photo.class";
import { IPhotoModel } from "../interfaces/photo-model.interface";
import { IPhoto } from "../interfaces/photo.interface";

@injectable()
export class PhotoRepository extends RecordRepositoryService<IPhoto, IPhotoModel, typeof Photo> {

    constructor(@inject('IDatabase') readonly dataBaseService: IDatabase<IPhotoModel>) {
        const table = 'photos';
        super(dataBaseService, table, Photo);
    }
}