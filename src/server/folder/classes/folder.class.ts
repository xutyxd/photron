import { Record } from "../../crosscutting/common/classes/record.class";
import { IRecord } from "../../crosscutting/common/interfaces/record.interface";
import { Optional } from "../../crosscutting/common/types/optional.type";
import { File } from "../../file/classes/file.class";
import { Tag } from "../../tag/classes/tag.class";
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
    public files: File[];
    public tags: IFolder['tags'] = {
        include: [],
        exclude: []
    };

    constructor(folder: Optional<IFolder, IRecord>) {
        super(folder);

        this.ownerId = folder.ownerId;
        this.owner = folder.owner;
        this.parentId = folder.parentId;
        this.parent = folder.parent;
        this.files = (folder.files || []).map((file) => new File(file));
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
            files: (folder.files || []).map((file) => File.fromModel(file)),
            tags: {
                include: (folder.tags?.include || []).map((tag) => Tag.fromModel(tag)),
                exclude: (folder.tags?.include || []).map((tag) => Tag.fromModel(tag))
            }
        });
    }
}