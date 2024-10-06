import { IEntityModelData } from "../../../crosscutting/common/interfaces/data";

export interface IFolderModelData extends IEntityModelData {
    owner_id: string;
    parent_id?: string;
    name: string;
    description?: string;
    // files_ids: string[];
    tags_include: string[];
    tags_exclude: string[];
}