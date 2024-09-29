import { Record } from "../../crosscutting/common/classes/record.class";
import { IRecord } from "../../crosscutting/common/interfaces/record.interface";
import { Optional } from "../../crosscutting/common/types/optional.type";
import { File } from "../../file/classes/file.class";
import { IFolder, IFolderModel } from "../interfaces";
import { FolderModel } from "./folder-model.class";

export class Folder extends Record implements IFolder {

    public ownerIndex: string;
    public parentIndex?: string;
    public name: string;
    public description?: string;

    public owner?: string;
    public parent?: string | undefined;
    public files: File[];
    public tags: IFolder['tags'] = {
        include: [],
        exclude: []
    };

    constructor(folder: Optional<IFolder, IRecord>) {
        super(folder);

        this.ownerIndex = folder.ownerIndex;
        this.owner = folder.owner;
        this.parentIndex = folder.parentIndex;
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
            ownerIndex: folder.owner_id,
            parentIndex: folder.parent_id,
            name: folder.name,
            description: folder.description,
            files: [],
            tags: {
                include: [],
                exclude: []
            }
        });
    }
}