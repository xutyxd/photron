import { IEntityAPIData } from "../../../crosscutting/common/interfaces/data";

export interface IFileAPIData extends IEntityAPIData {
    ownerIndex: string;
    name: string;
    description?: string;
    size: number;
    type: string;
    tags: string[];
}