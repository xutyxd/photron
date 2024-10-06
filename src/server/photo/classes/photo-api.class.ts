import { EntityAPI } from "../../crosscutting/common/classes";
import { IPhotoAPIData } from "../interfaces/data";
import { IPhotoAPI } from "../interfaces/dto";
import { Photo } from "./photo.class";


export class PhotoAPI extends EntityAPI implements IPhotoAPI {

    public fileIndex: string;
    public file?: string;
    public versionIndex: string;
    public ownerIndex: string;
    public owner?: string;
    public url;
    public size: number;
    public order: number;

    constructor(photo: IPhotoAPIData) {
        super(photo);

        this.fileIndex = photo.fileIndex;
        this.file = photo.file;
        this.versionIndex = photo.versionIndex;
        this.ownerIndex = photo.ownerIndex;
        this.url = photo.url;
        this.size = photo.size;
        this.order = photo.order;
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
        return new Photo(this).toDomain();
    }

    public static fromDomain(entity: IPhotoAPIData) {
        return new PhotoAPI({ ...entity });
    }
}