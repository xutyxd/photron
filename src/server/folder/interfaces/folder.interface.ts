import { IRecord } from "../../crosscutting/common/interfaces/record.interface";

export interface IFolder extends IRecord {
    ownerId: number;
    owner: string;
    parentId?: number;
    parent?: string;
    name: string;
    description?: string;
    filesIds: number[];
    files: unknown[];
}