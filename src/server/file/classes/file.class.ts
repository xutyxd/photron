import { Entity } from "../../crosscutting/common/classes";
import { IFileAPIData, IFileData, IFileModelData } from "../interfaces/data";
import { IFile } from "../interfaces/dto";

export class File extends Entity implements IFile {

    public ownerIndex: string;
    public name: string;
    public description?: string;
    public size: number;
    public type: string;
    public tags: string[];
    public deleted: boolean;

    public owner?: string;

    constructor(file: Partial<IFileData>) {
        super(file);

        this.ownerIndex = file.ownerIndex || crypto.randomUUID();
        this.name = file.name || '';
        this.description = file.description;
        this.size = file.size || 0;
        this.type = file.type || '';
        this.tags = file.tags || [];
        this.deleted = file.deleted || false;
    }

    public toApi(): IFileAPIData {
        const base = super.toApi();
        
        return {
            ...base,
            ownerIndex: this.ownerIndex,
            name: this.name,
            description: this.description,
            size: this.size,
            type: this.type,
            tags: this.tags
        };
    }

    public toDomain(): IFileData {
        const base = super.toDomain();
        
        return {
            ...base,
            ownerIndex: this.ownerIndex,
            name: this.name,
            description: this.description,
            size: this.size,
            type: this.type,
            tags: this.tags,
            deleted: this.deleted
        };
    }

    public toModel(): IFileModelData {
        const base = super.toModel();
        
        return {
            ...base,
            owner_id: this.ownerIndex,
            name: this.name,
            description: this.description,
            size: this.size,
            type: this.type,
            tags: this.tags,
            deleted: this.deleted
        };
    }

    public static fromAPI(file: IFileAPIData): File {
        return new File(file);
    }

    public static fromModel(file: IFileModelData): File {
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