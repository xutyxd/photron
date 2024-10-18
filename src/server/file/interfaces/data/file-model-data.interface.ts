import { IEntityModelData } from "../../../crosscutting/common/interfaces/data";

export interface IFileModelData extends IEntityModelData {
    owner_uuid: string;
    name: string;
    description?: string;
    size: number;
    type: string;
    tags: string[];
    deleted: boolean;
}