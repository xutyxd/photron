import { IRecord } from "../../crosscutting/common/interfaces/record.interface";

export interface ITag extends IRecord {
    ownerId: string;
    owner?: string;
    name: string;
    description?: string;
    color?: string;
}