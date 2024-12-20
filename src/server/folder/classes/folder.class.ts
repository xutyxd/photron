
import { Entity } from "../../crosscutting/common/classes";
import { IFolderAPIData, IFolderData, IFolderModelData } from "../interfaces/data";
import { IFolder } from "../interfaces/dto";

export class Folder extends Entity implements IFolder {

    public ownerIndex: string;
    public parentIndex?: string;
    public name: string;
    public description?: string;

    public owner?: string;
    public parent?: string | undefined;
    public tags;

    constructor(folder: Partial<IFolderData>) {
        super(folder);

        this.ownerIndex = folder.ownerIndex || '';
        this.owner = folder.owner;
        this.parentIndex = folder.parentIndex;
        this.parent = folder.parent;
        this.name = folder.name || '';
        this.description = folder.description;
        this.tags = folder.tags || { include: [], exclude: [] };
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            ownerIndex: this.ownerIndex,
            parentIndex: this.parentIndex,
            name: this.name,
            description: this.description,
            tags: this.tags
        };
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            ownerIndex: this.ownerIndex,
            parentIndex: this.parentIndex,
            name: this.name,
            description: this.description,
            tags: this.tags,
        };
    }

    public toModel() {
        const base = super.toModel();

        return {
            ...base,
            owner_uuid: this.ownerIndex,
            parent_uuid: this.parentIndex,
            name: this.name,
            description: this.description,
            tags_include: this.tags.include,
            tags_exclude: this.tags.exclude
        };
    }

    public static fromAPI(folder: IFolderAPIData) {
        return new Folder(folder);
    }

    public static fromModel(folder: IFolderModelData): Folder {
        return new Folder({
            id: folder.id,
            uuid: folder.uuid,
            createdAt: folder.created_at,
            updatedAt: folder.updated_at,
            ownerIndex: folder.owner_uuid,
            parentIndex: folder.parent_uuid,
            name: folder.name,
            description: folder.description,
            tags: {
                include: [],
                exclude: []
            }
        });
    }
}