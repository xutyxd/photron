import { Record } from "../../crosscutting/common/classes";
import { IRecord } from "../../crosscutting/common/interfaces";
import { Optional } from "../../crosscutting/common/types/optional.type";
import { IPhoto, IPhotoModel } from "../interfaces";
import { PhotoModel } from "./photo-model.class";

export class Photo extends Record implements IPhoto {

    public file_id: number;
    public file?: string;
    public version_id: number;
    public ownerIndex: number;
    public owner?: string;
    public url_photo: string;
    public url_delete: string;
    public size: number;
    public order: number;

    constructor(photo: Optional<IPhoto, IRecord>) {
        super(photo);

        this.file_id = photo.file_id;
        this.file = photo.file;
        this.version_id = photo.version_id;
        this.ownerIndex = photo.ownerIndex;
        this.owner = photo.owner;
        this.url_photo = photo.url_photo;
        this.url_delete = photo.url_delete;
        this.size = photo.size;
        this.order = photo.order;
    }

    public toModel() {
        return new PhotoModel(this).export();
    }

    public static fromModel(photo: IPhotoModel): Photo {
        return new Photo({
            id: photo.id,
            uuid: photo.uuid,
            createdAt: photo.created_at,
            updatedAt: photo.updated_at,
            file_id: photo.file_id,
            version_id: photo.version_id,
            ownerIndex: photo.owner_id,
            url_photo: photo.url_photo,
            url_delete: photo.url_delete,
            size: photo.size,
            order: photo.order
        });
    }
}