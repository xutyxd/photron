import { IRecord } from "../../crosscutting/common/interfaces";

export interface IPhoto extends IRecord {
    file_id: number;
    file?: string;
    version_id: number;
    ownerIndex: number;
    owner?: string;
    url_photo: string;
    url_delete: string;
    size: number;
    order: number;
}