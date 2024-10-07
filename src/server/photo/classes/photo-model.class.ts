import { EntityModel } from "../../crosscutting/common/classes";
import { IPhotoData, IPhotoModelData } from "../interfaces/data";
import { IPhotoModel } from "../interfaces/dto";

export class PhotoModel extends EntityModel implements IPhotoModel {

    public file_uuid: string;
    public version_uuid: string;
    public owner_uuid: string;
    public url_photo: string;
    public url_delete: string;
    public size: number;
    public order: number;

    constructor(photo: IPhotoModelData) {
        super(photo);

        this.file_uuid = photo.file_uuid;
        this.version_uuid = photo.version_uuid;
        this.owner_uuid = photo.owner_uuid;
        this.url_photo = photo.url_photo;
        this.url_delete = photo.url_delete;
        this.size = photo.size;
        this.order = photo.order;
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            fileIndex: this.file_uuid,
            versionIndex: this.version_uuid,
            ownerIndex: this.owner_uuid,
            url: {
                get: this.url_photo,
                delete: this.url_delete
            },
            size: this.size,
            order: this.order
        };
    }

    public toRepository() {
        const base = super.toRepository();

        return {
            ...base,
            file_uuid: this.file_uuid,
            version_uuid: this.version_uuid,
            owner_uuid: this.owner_uuid,
            url_photo: this.url_photo,
            url_delete: this.url_delete,
            size: this.size,
            order: this.order
        };
    }

    public static fromDomain(photo: IPhotoData) {
        return new PhotoModel({
            ...photo,
            created_at: photo.createdAt,
            updated_at: photo.updatedAt,
            file_uuid: photo.fileIndex,
            version_uuid: photo.versionIndex,
            owner_uuid: photo.ownerIndex,
            url_photo: photo.url.get,
            url_delete: photo.url.delete,
            size: photo.size,
            order: photo.order
        });
    }

    public static fromRepository(photo: IPhotoModelData) {
        return new PhotoModel({ ...photo});
    }
}