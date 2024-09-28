import { RecordAPI } from "../../crosscutting/common/classes/record-api.class";
import { ITagAPI } from "../interfaces/tag-api.interface";
import { ITag } from "../interfaces/tag.interface";

export class TagAPI  extends RecordAPI implements ITagAPI {

    public ownerId: string;
    public owner?: string;
    public name: string;
    public description?: string;
    public color?: string;

    constructor(tag: ITag) {
        super(tag);

        this.ownerId = tag.ownerId;
        this.owner = tag.owner;
        this.name = tag.name;
        this.description = tag.description;
        this.color = tag.color;
    }

    public export() {
        return {
            ...super.export(),
            ownerId: this.ownerId,
            owner: this.owner,
            name: this.name,
            description: this.description,
            color: this.color
        };
    }
}