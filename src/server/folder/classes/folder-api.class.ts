import { RecordAPI } from "../../crosscutting/common/classes/record-api.class";
import { IFile } from "../../file/interfaces/file.interface";
import { ITag } from "../../tag/interfaces/tag.interface";
import { IFolderAPI } from "../interfaces/folder-api.interface";
import { IFolder } from "../interfaces/folder.interface";

export class FolderAPI extends RecordAPI implements IFolderAPI {

    public owner: string;
    public parent?: string;
    public name: string;
    public description?: string;
    public files: IFile[] = [];
    public tags: IFolderAPI['tags'] = {
        include: [],
        exclude: []
    };

    constructor(folder: IFolder) {
        super(folder);

        this.owner = folder.owner;
        this.parent = folder.parent;
        this.name = folder.name;
        this.description = folder.description;
        this.files = folder.files;
        this.tags = folder.tags;
    }

    public export(){
        return {
            ...super.export(),
            owner: this.owner,
            parent: this.parent,
            name: this.name,
            description: this.description,
            files: this.files,
            tags: this.tags
        };
    }
}