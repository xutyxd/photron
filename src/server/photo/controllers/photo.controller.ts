import { inject, injectable } from "inversify";
import { RecordController } from "../../crosscutting/common/controllers/record.controller";
import { PhotoService } from "../services/photo.service";
import { Photo, PhotoAPI } from "../classes";
import { IPhoto, IPhotoModel } from "../interfaces";
import { photoBase, photoCreate, photoUpdate } from "../schemas";
import { IHTTPController } from "server-over-express";

@injectable()
export class PhotoController extends RecordController<typeof Photo, IPhoto, IPhotoModel> implements IHTTPController {

    public path = 'photos';

    constructor(@inject(PhotoService) readonly photoService: PhotoService) {
        const schemas = {
            base: photoBase,
            create: photoCreate,
            update: photoUpdate,
            ref: 'photo-base.request.json'
        };

        super(photoService, schemas, PhotoAPI);
    }
}