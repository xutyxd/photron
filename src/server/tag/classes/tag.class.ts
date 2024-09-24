import { Record } from "../../crosscutting/common/classes/record.class";
import { IRecord } from "../../crosscutting/common/interfaces/record.interface";
import { Optional } from "../../crosscutting/common/types/optional.type";
import { ITagModel } from "../interfaces/tag-model.interface";
import { ITag } from "../interfaces/tag.interface";
import { TagModel } from "./tag-model.class";

export class Tag extends Record implements ITag { 

    public ownerId: number;
    public owner?: string;
    public name: string;
    public description?: string;
    public color?: string;

    constructor(tag: Optional<ITag, IRecord>) {
        super(tag);

        this.ownerId = tag.ownerId;
        this.owner = tag.owner;
        this.name = tag.name;
        this.description = tag.description;
        this.color = tag.color;
    }

    public toModel() {
        return new TagModel(this).export();
    }

    public static fromModel(tag: ITagModel): Tag {
        return new Tag({
            id: tag.id,
            uuid: tag.uuid,
            createdAt: tag.created_at,
            updatedAt: tag.updated_at,
            ownerId: tag.owner_id,
            owner: tag.owner,
            name: tag.name,
            description: tag.description,
            color: tag.color
        });
    }
}