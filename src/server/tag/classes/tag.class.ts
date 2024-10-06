import { Entity } from "../../crosscutting/common/classes";
import { ITagAPIData, ITagData, ITagModelData } from "../interfaces/data";
import { ITag } from "../interfaces/dto";

export class Tag extends Entity implements ITag { 

    public ownerIndex: string;
    public owner?: string;
    public name: string;
    public description?: string;
    public color?: string;

    constructor(tag: Partial<ITagData>) {
        super(tag);

        this.ownerIndex = tag.ownerIndex || '';
        this.owner = tag.owner;
        this.name = tag.name || '';
        this.description = tag.description;
        this.color = tag.color;
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            ownerIndex: this.ownerIndex,
            name: this.name,
            description: this.description,
            color: this.color
        };
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            ownerIndex: this.ownerIndex,
            name: this.name,
            description: this.description,
            color: this.color
        };
    }

    public toModel() {
        const base = super.toModel();

        return {
            ...base,
            owner_uuid: this.ownerIndex,
            name: this.name,
            description: this.description,
            color: this.color
        };
    }

    public static fromAPI(tag: ITagAPIData): Tag {
        return new Tag(tag);
    }

    public static fromModel(tag: ITagModelData): Tag {
        return new Tag({
            id: tag.id,
            uuid: tag.uuid,
            createdAt: tag.created_at,
            updatedAt: tag.updated_at,
            ownerIndex: tag.owner_uuid,
            name: tag.name,
            description: tag.description,
            color: tag.color
        });
    }
}