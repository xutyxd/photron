import { EntityModel } from "../../crosscutting/common/classes";
import { IFolderData, IFolderModelData } from "../interfaces/data";
import { IFolderModel } from "../interfaces/dto";

export class FolderModel extends EntityModel implements IFolderModel {

    public owner_uuid: string;
    public parent_uuid?: string;
    public name: string;
    public description?: string;
    public owner?: string;
    public parent?: string | undefined;
    public tags_include: string[];   
    public tags_exclude: string[];

    constructor(folder: IFolderModelData) {
        super(folder);

        this.owner_uuid = folder.owner_uuid;
        this.parent_uuid = folder.parent_uuid;
        this.name = folder.name;
        this.description = folder.description;
        this.tags_include = folder.tags_include;
        this.tags_exclude = folder.tags_exclude;
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            ownerIndex: this.owner_uuid,
            parentIndex: this.parent_uuid,
            name: this.name,
            description: this.description,
            tags: {
                include: this.tags_include,
                exclude: this.tags_exclude
            }
        };
    }

    public toRepository() {
        const base = super.toRepository();

        return {
            ...base,
            owner_uuid: this.owner_uuid,
            parent_uuid: this.parent_uuid,
            name: this.name,
            description: this.description,
            tags_include: this.tags_include,
            tags_exclude: this.tags_exclude
        };
    }

    public static fromDomain(folder: IFolderData) {
        return new FolderModel({
            ...folder,
            created_at: folder.createdAt,
            updated_at: folder.updatedAt,
            owner_uuid: folder.ownerIndex,
            parent_uuid: folder.parentIndex,
            tags_include: folder.tags.include,
            tags_exclude: folder.tags.exclude,
        });
    }

    public static fromRepository(folder: IFolderModelData) {
        return new FolderModel({ ...folder});
    }
}