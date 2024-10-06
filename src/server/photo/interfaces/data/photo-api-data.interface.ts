import { IEntityAPIData } from "../../../crosscutting/common/interfaces/data";

export interface IPhotoAPIData extends IEntityAPIData {
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