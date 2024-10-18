import { EntityModel } from "../../crosscutting/common/classes";
import { IFileData, IFileModelData } from "../interfaces/data";
import { IFileModel } from "../interfaces/dto";

export class FileModel extends EntityModel implements IFileModel {

    public owner_uuid: string;
    public name: string;
    public description?: string;
    public size: number;
    public type: string;
    public tags: string[];
    public deleted: boolean;

    constructor(file: IFileModelData) {
        super(file);

        this.owner_uuid = file.owner_uuid;
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
            ownerIndex: this.owner_uuid,
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
            owner_uuid: this.owner_uuid,
            name: this.name,
            description: this.description,
            size: this.size,
            type: this.type,
            tags: this.tags,
            deleted: this.deleted
        };
    }

    public static fromDomain(file: IFileData): FileModel {
        return new FileModel({
            ...file,
            created_at: file.createdAt,
            updated_at: file.updatedAt,
            owner_uuid: file.ownerIndex
        });
    }

    public static fromRepository(file: IFileModelData): FileModel {
        return new FileModel({ ...file });
    }
}