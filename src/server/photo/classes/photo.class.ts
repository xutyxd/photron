import { Entity } from "../../crosscutting/common/classes";
import { IPhotoAPIData, IPhotoData, IPhotoModelData } from "../interfaces/data";
import { IPhoto } from "../interfaces/dto";

export class Photo extends Entity implements IPhoto {

    public fileIndex: string;
    public file?: string;
    public versionIndex: string;
    public ownerIndex: string;
    public owner?: string;
    public url;
    public size: number;
    public order: number;

    constructor(photo: Partial<IPhotoData>) {
        super(photo);

        this.fileIndex = photo.fileIndex || '';
        this.file = photo.file;
        this.versionIndex = photo.versionIndex || '';
        this.ownerIndex = photo.ownerIndex || '';
        this.url = photo.url || { get: '', delete: '' };
        this.size = photo.size || 0;
        this.order = photo.order || 0;
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            fileIndex: this.fileIndex,
            file: this.file,
            versionIndex: this.versionIndex,
            ownerIndex: this.ownerIndex,
            url: this.url,
            size: this.size,
            order: this.order
        };
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            fileIndex: this.fileIndex,
            file: this.file,
            versionIndex: this.versionIndex,
            ownerIndex: this.ownerIndex,
            url: this.url,
            size: this.size,
            order: this.order
        };
    }

    public toModel() {
        const base = super.toModel();

        return {
            ...base,
            file_uuid: this.fileIndex,
            version_uuid: this.versionIndex,
            owner_uuid: this.ownerIndex,
            url_photo: this.url.get,
            url_delete: this.url.delete,
            size: this.size,
            order: this.order
        };
    }

    public static fromAPI(photo: IPhotoAPIData): Photo {
        return new Photo(photo);
    }

    public static fromModel(photo: IPhotoModelData): Photo {
        return new Photo({
            id: photo.id,
            uuid: photo.uuid,
            createdAt: photo.created_at,
            updatedAt: photo.updated_at,
            fileIndex: photo.file_uuid,
            versionIndex: photo.version_uuid,
            ownerIndex: photo.owner_uuid,
            url: {
                get: photo.url_photo,
                delete: photo.url_delete
            },
            size: photo.size,
            order: photo.order
        });
    }
}