import { EntityAPI } from "../../crosscutting/common/classes";
import { IFolderAPIData } from "../interfaces/data";
import { IFolderAPI } from "../interfaces/dto";
import { Folder } from "./folder.class";

export class FolderAPI extends EntityAPI implements IFolderAPI {

    public owner?: string;
    public parent?: string;
    public name: string;
    public description?: string;
    public files: string[] = [];
    public tags;

    constructor(folder: IFolderAPIData) {
        super(folder);

        this.owner = folder.owner;
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
            ownerIndex: '',
            parentIndex: '',
            name: this.name,  
            files: this.files,
            tags: this.tags
        };
    }

    public toDomain() {
        return new Folder(this).toDomain();
    }

    public static fromDomain(entity: IFolderAPIData) {
        return new FolderAPI({ ...entity });
    }
}