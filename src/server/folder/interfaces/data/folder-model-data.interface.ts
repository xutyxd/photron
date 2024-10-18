import { IEntityModelData } from "../../../crosscutting/common/interfaces/data";

export interface IFolderModelData extends IEntityModelData {
    owner_uuid: string;
    parent_uuid?: string;
    name: string;
    description?: string;
    // files_ids: string[];
    tags_include: string[];
    tags_exclude: string[];
}