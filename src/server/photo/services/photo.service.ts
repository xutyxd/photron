import { inject, injectable } from "inversify";
import { EntityService } from "../../crosscutting/common";
import { Photo } from "../classes";
import { IPhotoAPIData, IPhotoData, IPhotoModelData } from "../interfaces/data";
import { PhotoRepository } from "../repository/photo.repository";

@injectable()
export class PhotoService extends EntityService<IPhotoAPIData, IPhotoData, IPhotoModelData> {

    constructor(@inject(PhotoRepository) readonly photoRepository: PhotoRepository) {
        super(photoRepository, Photo);
    }
}