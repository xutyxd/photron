import { EntityAPI } from "../../crosscutting/common/classes";
import { IFolderAPIData, IFolderData } from "../interfaces/data";
import { IFolderAPI } from "../interfaces/dto";
import { Folder } from "./folder.class";

export class FolderAPI extends EntityAPI implements IFolderAPI {

    public ownerIndex: string;
    public owner?: string;
    public parentIndex?: string;
    public parent?: string;
    public name: string;
    public description?: string;
    public files: string[] = [];
    public tags;

    constructor(folder: IFolderAPIData) {
        super(folder);

        this.ownerIndex = folder.ownerIndex;
        this.owner = folder.owner;
        this.parentIndex = folder.parentIndex;
        this.parent = folder.parent;
        this.name = folder.name;
        this.description = folder.description;
        this.files = folder.files;
        this.tags = folder.tags;
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            ownerIndex: this.ownerIndex,
            parentIndex: this.parent,
            name: this.name,
            description: this.description,
            files: this.files,
            tags: this.tags
        };
    }

    public toDomain() {
        return new Folder(this).toDomain();
    }

    public static fromDomain(entity: IFolderData) {
        return new FolderAPI({ ...entity });
    }
}