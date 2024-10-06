import { IEntityData } from "../../../crosscutting/common/interfaces/data";

export interface ITagData extends IEntityData {
    ownerIndex: string;
    owner?: string;
    name: string;
    description?: string;
    color?: string;
}