import { IRecord } from "../../crosscutting/common/interfaces/record.interface";

export interface IFile extends IRecord {
    ownerId: number;
    owner: string;
    name: string;
    description?: string;
    size: number;
    type: string;
    tags: number[];
    deleted: boolean;
}