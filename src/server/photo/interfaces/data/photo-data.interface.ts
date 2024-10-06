import { IEntityData } from "../../../crosscutting/common/interfaces/data";

export interface IPhotoData extends IEntityData {
    fileIndex: string;
    file?: string;
    versionIndex: string;
    ownerIndex: string;
    url: {
        get: string;
        delete: string;
    };
    size: number;
    order: number;
}