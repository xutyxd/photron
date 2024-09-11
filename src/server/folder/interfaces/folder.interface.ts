import { IRecord } from "../../crosscutting/common/interfaces/record.interface";

export interface IFolder extends IRecord {
    ownerId: number;
    parentId?: number;
    name: string;
    description?: string;
}