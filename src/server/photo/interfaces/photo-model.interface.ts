import { IRecordModel } from "../../crosscutting/common/interfaces";

export interface IPhotoModel extends IRecordModel {
    file_id: number;
    version_id: number;
    owner_id: number;
    url_photo: string;
    url_delete: string;
    size: number;
    order: number;
}