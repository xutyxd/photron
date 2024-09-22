import { RecordAPI } from "../../crosscutting/common/classes/record-api.class";
import { IFileAPI } from "../interfaces/file-api.interface";
import { IFile } from "../interfaces/file.interface";

export class FileAPI extends RecordAPI implements IFileAPI {

    public ownerId: number;
    public owner: string;
    public name: string;
    public description?: string;
    public size: number;
    public type: string;
    public tags: number[];
    public deleted: boolean;

    constructor(file: IFile) {
        super(file);

        this.ownerId = file.ownerId;
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
            ownerId: this.ownerId,
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