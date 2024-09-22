import { RecordModel } from "../../crosscutting/common/classes/record-model.class";
import { ITagModel } from "../interfaces/tag-model.interface";
import { ITag } from "../interfaces/tag.interface";

export class TagModel extends RecordModel implements ITagModel {

    public owner_id: number;
    public owner: string;
    public name: string;
    public description?: string;
    public color?: string;

    constructor(tag: ITag) {
        super(tag);

        this.owner_id = tag.ownerId;
        this.owner = tag.owner;
        this.name = tag.name;
        this.description = tag.description;
        this.color = tag.color;
    }

    public export() {
        return {
            ...super.export(),
            owner_id: this.owner_id,
            owner: this.owner,
            name: this.name,
            description: this.description,
            color: this.color
        };
    }
}