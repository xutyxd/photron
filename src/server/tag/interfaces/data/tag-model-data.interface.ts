import { IEntityModelData } from "../../../crosscutting/common/interfaces/data";

export interface ITagModelData extends IEntityModelData {
    owner_uuid: string;
    name: string;
    description?: string;
    color?: string;
}