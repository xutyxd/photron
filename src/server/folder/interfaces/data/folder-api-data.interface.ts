import { IEntityAPIData } from "../../../crosscutting/common/interfaces/data";

export interface IFolderAPIData extends IEntityAPIData {
    ownerIndex: string;
    owner?: string;
    parentIndex?: string;
    parent?: string;
    name: string;
    description?: string;
    files: string[];
    tags: {
        include: string[];
        exclude: string[];
    }
}