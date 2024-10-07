import { EntityModel } from "../../crosscutting/common/classes";
import { ITagData, ITagModelData } from "../interfaces/data";
import { ITag, ITagModel } from "../interfaces/dto";

export class TagModel extends EntityModel implements ITagModel {

    public owner_uuid: string;
    public owner?: string;
    public name: string;
    public description?: string;
    public color?: string;

    constructor(tag: ITagModelData) {
        super(tag);

        this.owner_uuid = tag.owner_uuid;
        this.name = tag.name;
        this.description = tag.description;
        this.color = tag.color;
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            ownerIndex: this.owner_uuid,
            name: this.name,
            description: this.description,
            color: this.color
        };
    }

    public toRepository() {
        const base = super.toRepository();

        return {
            ...base,
            owner_uuid: this.owner_uuid,
            name: this.name,
            description: this.description,
            color: this.color
        };
    }

    public static fromDomain(tag: ITagData) {
        return new TagModel({
            ...tag,
            created_at: tag.createdAt,
            updated_at: tag.updatedAt,
            owner_uuid: tag.ownerIndex,
            name: tag.name,
            description: tag.description,
            color: tag.color
        });
    }

    public static fromRepository(tag: ITagModelData) {
        return new TagModel({ ...tag });
    }
}