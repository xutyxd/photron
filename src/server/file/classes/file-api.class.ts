import { RecordAPI } from "../../crosscutting/common/classes/record-api.class";
import { IFileAPI } from "../interfaces/file-api.interface";
import { IFile } from "../interfaces/file.interface";

export class FileAPI extends RecordAPI implements IFileAPI {

    public ownerIndex: string;
    public owner?: string;
    public name: string;
    public description?: string;
    public size: number;
    public type: string;
    public tags: string[];

    constructor(file: Omit<IFile, 'toModel' | 'deleted'>) {
        super(file);

        this.ownerIndex = file.ownerIndex;
        this.owner = file.owner;
        this.name = file.name;
        this.description = file.description;
        this.size = file.size;
        this.type = file.type;
        this.tags = file.tags || [];
    }

    public export() {
        return {
            ...super.export(),
            ownerIndex: this.ownerIndex,
            owner: this.owner,
            name: this.name,
            description: this.description,
            size: this.size,
            type: this.type,
            tags: this.tags
        };
    }
}