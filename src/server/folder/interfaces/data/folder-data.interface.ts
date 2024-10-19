import { IEntityData } from "../../../crosscutting/common/interfaces/data";

export interface IFolderData extends IEntityData {
    ownerIndex: string;
    owner?: string;
    parentIndex?: string;
    parent?: string;
    name: string;
    description?: string;
    tags: {
        include: string[];
        exclude: string[];
    }
}