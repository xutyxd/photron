import { injectable, inject } from "inversify";
import { EntityService } from "../../crosscutting/common";
import { Photo } from "../classes";
import { IPhotoAPIData, IPhotoData, IPhotoModelData } from "../interfaces/data";
import { IPhotoStatic } from "../interfaces/static";
import { PhotoRepository } from "../repository/photo.repository";

@injectable()
export class PhotoService extends EntityService<IPhotoAPIData, IPhotoData, IPhotoModelData, IPhotoStatic> {

    constructor(@inject(PhotoRepository) readonly photoRepository: PhotoRepository) {
        super(photoRepository, Photo);
    }
}