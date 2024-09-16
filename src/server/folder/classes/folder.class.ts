import { Record } from "../../crosscutting/common/classes/record.class";
import { IRecord } from "../../crosscutting/common/interfaces/record.interface";
import { Optional } from "../../crosscutting/common/types/optional.type";
import { IFolderModel } from "../interfaces/folder-model.interface";
import { IFolder } from "../interfaces/folder.interface";
import { FolderModel } from "./folder-model.class";

export class Folder extends Record implements IFolder {

    public ownerId: number;
    public parentId?: number;
    public name: string;
    public description?: string;

    public owner: string;
    public parent?: string | undefined;
    public filesIds: number[];
    public files: unknown[];

    constructor(folder: Optional<IFolder, IRecord>) {
        super(folder);

        this.ownerId = folder.ownerId;
        this.owner = folder.owner;
        this.parentId = folder.parentId;
        this.parent = folder.parent;
        this.filesIds = folder.filesIds;
        this.files = folder.files;
        this.name = folder.name;
        this.description = folder.description;
    }

    public toModel() {
        return new FolderModel(this).export();
    }

    public static fromModel(folder: IFolderModel): Folder {
        return new Folder({
            id: folder.id,
            uuid: folder.uuid,
            createdAt: folder.created_at,
            updatedAt: folder.updated_at,
            ownerId: folder.owner_id,
            owner: folder.owner,
            parentId: folder.parent_id,
            parent: folder.parent,
            name: folder.name,
            description: folder.description,
            filesIds: folder.files_ids || [],
            files: folder.files || []
        });
    }
}