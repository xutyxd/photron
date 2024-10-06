import { EntityAPI } from "../../crosscutting/common/classes";
import { ITagAPIData } from "../interfaces/data";
import { ITagAPI, ITag } from "../interfaces/dto";
import { Tag } from "./tag.class";

export class TagAPI  extends EntityAPI implements ITagAPI {

    public ownerIndex: string;
    public owner?: string;
    public name: string;
    public description?: string;
    public color?: string;

    constructor(tag: ITagAPIData) {
        super(tag);

        this.ownerIndex = tag.ownerIndex;
        this.name = tag.name;
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
        return new Tag(this).toDomain();
    }

    public static fromDomain(entity: ITagAPIData) {
        return new TagAPI({ ...entity });
    }
}