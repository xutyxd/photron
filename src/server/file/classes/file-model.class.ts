import { EntityModel } from "../../crosscutting/common/classes";
import { IFileData, IFileModelData } from "../interfaces/data";
import { IFileModel } from "../interfaces/dto";

export class FileModel extends EntityModel implements IFileModel {

    public owner_id: string;
    public name: string;
    public description?: string;
    public size: number;
    public type: string;
    public tags: string[];
    public deleted: boolean;

    constructor(file: IFileModelData) {
        super(file);

        this.owner_id = file.owner_id;
        this.name = file.name;
        this.description = file.description;
        this.size = file.size;
        this.type = file.type;
        this.tags = file.tags;
        this.deleted = file.deleted;
    }

    public toDomain() {
        const base = super.toDomain();
        
        return {
            ...base,
            ownerIndex: this.owner_id,
            name: this.name,
            description: this.description,
            size: this.size,
            type: this.type,
            tags: this.tags,
            deleted: this.deleted
        };
    }
    
    public toRepository() {
        const base = super.toRepository();
        
        return {
            ...base,
            owner_id: this.owner_id,
            name: this.name,
            description: this.description,
            size: this.size,
            type: this.type,
            tags: this.tags,
            deleted: this.deleted
        };
    }

    public static fromEntity(file: IFileData): FileModel {
        return new FileModel({
            ...file,
            created_at: file.createdAt,
            updated_at: file.updatedAt,
            owner_id: file.ownerIndex
        });
    }

    public static fromRepository(file: IFileModelData): FileModel {
        return new FileModel({ ...file });
    }
}