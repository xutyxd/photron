import { RecordAPI } from "../../crosscutting/common/classes";
import { IPhotoAPI, IPhoto } from "../interfaces";

export class PhotoAPI extends RecordAPI implements IPhotoAPI {

    public file_id: number;
    public file?: string;
    public version_id: number;
    public ownerIndex: number;
    public owner?: string;
    public url_photo: string;
    public url_delete: string;
    public size: number;
    public order: number;

    constructor(photo: Omit<IPhoto, 'toModel'>) {
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

    public export() {
        return {
            ...super.export(),
            file_id: this.file_id,
            file: this.file,
            version_id: this.version_id,
            ownerIndex: this.ownerIndex,
            owner: this.owner,
            url_photo: this.url_photo,
            url_delete: this.url_delete,
            size: this.size,
            order: this.order
        };
    }
}