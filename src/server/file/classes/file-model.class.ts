import { RecordModel } from "../../crosscutting/common/classes/record-model.class";
import { IFileModel } from "../interfaces/file-model.interface";
import { IFile } from "../interfaces/file.interface";

export class FileModel extends RecordModel implements IFileModel {

    public owner_id: string;
    public owner?: string;
    public name: string;
    public description?: string;
    public size: number;
    public type: string;
    public tags: string[];
    public deleted: boolean;

    constructor(file: IFile) {
        super(file);

        this.owner_id = file.ownerIndex;
        this.owner = file.owner;
        this.name = file.name;
        this.description = file.description;
        this.size = file.size;
        this.type = file.type;
        this.tags = file.tags;
        this.deleted = file.deleted;
    }

    public export() {
        return {
            ...super.export(),
            owner_id: this.owner_id,
            owner: this.owner,
            name: this.name,
            description: this.description,
            size: this.size,
            type: this.type,
            tags: this.tags,
            deleted: this.deleted
        };
    }
}