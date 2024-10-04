import { inject, injectable } from "inversify";
import { RecordService } from "../../crosscutting/common/services";
import { Photo } from "../classes/photo.class";
import { IPhoto, IPhotoModel } from "../interfaces";
import { PhotoRepository } from "../repository/photo.repository";

@injectable()
export class PhotoService extends RecordService<typeof Photo, IPhoto, IPhotoModel> {

    constructor(@inject(PhotoRepository) readonly photoRepository: PhotoRepository) {
        super(photoRepository, Photo);
    }
}