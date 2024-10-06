import { IEntityAPIData } from "../../../crosscutting/common/interfaces/data";

export interface ITagAPIData extends IEntityAPIData {
    ownerIndex: string;
    owner?: string;
    name: string;
    description?: string;
    color?: string;
}