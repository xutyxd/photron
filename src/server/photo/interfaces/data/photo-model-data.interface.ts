import { IEntityModelData } from "../../../crosscutting/common/interfaces/data";

export interface IPhotoModelData extends IEntityModelData {
    file_uuid: string;
    version_uuid: string;
    owner_uuid: string;
    url_photo: string;
    url_delete: string;
    size: number;
    order: number;
}