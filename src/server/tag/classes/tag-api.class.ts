import { RecordAPI } from "../../crosscutting/common/classes/record-api.class";
import { ITag, ITagAPI } from "../interfaces";

export class TagAPI  extends RecordAPI implements ITagAPI {

    public ownerIndex: string;
    public owner?: string;
    public name: string;
    public description?: string;
    public color?: string;

    constructor(tag: ITag) {
        super(tag);

        this.ownerIndex = tag.ownerIndex;
        this.owner = tag.owner;
        this.name = tag.name;
        this.description = tag.description;
        this.color = tag.color;
    }

    public export() {
        return {
            ...super.export(),
            ownerIndex: this.ownerIndex,
            owner: this.owner,
            name: this.name,
            description: this.description,
            color: this.color
        };
    }
}