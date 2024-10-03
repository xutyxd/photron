import { Record } from "../../crosscutting/common/classes/record.class";
import { IRecord } from "../../crosscutting/common/interfaces/record.interface";
import { Optional } from "../../crosscutting/common/types/optional.type";
import { IFileModel } from "../interfaces/file-model.interface";
import { IFile } from "../interfaces/file.interface";
import { FileModel } from "./file-model.class";

export class File extends Record implements IFile {

    public ownerIndex: string;
    public name: string;
    public description?: string;
    public size: number;
    public type: string;
    public tags: string[];
    public deleted: boolean;

    public owner?: string;

    constructor(file: Optional<IFile, IRecord>) {
        super(file);

        this.ownerIndex = file.ownerIndex;
        this.owner = file.owner;
        this.name = file.name;
        this.description = file.description;
        this.size = file.size;
        this.type = file.type;
        this.tags = file.tags;
        this.deleted = file.deleted;
    }

    public toModel() {
        return new FileModel(this).export();
    }

    public static fromModel(file: IFileModel): File {
        return new File({
            id: file.id,
            uuid: file.uuid,
            createdAt: file.created_at,
            updatedAt: file.updated_at,
            ownerIndex: file.owner_id,
            name: file.name,
            description: file.description,
            size: file.size,
            type: file.type,
            tags: file.tags,
            deleted: file.deleted
        });
    }
}