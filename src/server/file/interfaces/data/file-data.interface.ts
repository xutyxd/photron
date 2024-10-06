import { IEntityData } from "../../../crosscutting/common/interfaces/data";

export interface IFileData extends IEntityData {
    ownerIndex: string;
    name: string;
    description?: string;
    size: number;
    type: string;
    tags: string[];
    deleted: boolean;
}