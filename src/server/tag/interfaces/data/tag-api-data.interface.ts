import { IEntityAPIData } from "../../../crosscutting/common/interfaces/data";

export interface ITagAPIData extends IEntityAPIData {
    ownerIndex: string;
    name: string;
    description?: string;
    color?: string;
}