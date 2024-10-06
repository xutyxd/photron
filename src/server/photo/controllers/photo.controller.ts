import { inject, injectable } from "inversify";
import { IHTTPController } from "server-over-express";
import { EntityController } from "../../crosscutting/common";
import { PhotoAPI } from "../classes";
import { IPhotoAPIData, IPhotoData, IPhotoModelData } from "../interfaces/data";
import { IPhotoAPIStatic } from "../interfaces/static";
import { photoBase, photoCreate, photoUpdate } from "../schemas";
import { PhotoService } from "../services/photo.service";

@injectable()
export class PhotoController extends EntityController<IPhotoAPIData, IPhotoData, IPhotoModelData, IPhotoAPIStatic> implements IHTTPController {

    public path = 'photos';

    constructor(@inject(PhotoService) readonly photoService: PhotoService) {
        const schemas = {
            base: photoBase,
            create: photoCreate,
            update: photoUpdate,
            ref: '#/components/schemas/photo-base.request.json'
        };

        super(photoService, schemas, PhotoAPI);
    }
}