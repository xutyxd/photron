import { IRecord } from "../../crosscutting/common/interfaces/record.interface";

export interface IFile extends IRecord {
    ownerIndex: string;
    owner?: string;
    name: string;
    description?: string;
    size: number;
    type: string;
    tags: string[];
    deleted: boolean;
}