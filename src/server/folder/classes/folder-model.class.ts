import { RecordModel } from "../../crosscutting/common/classes/record-model.class";
import { File } from "../../file/classes/file.class";
import { IFileModel } from "../../file/interfaces/file-model.interface";
import { Tag } from "../../tag/classes/tag.class";
import { ITagModel } from "../../tag/interfaces/tag-model.interface";
import { IFolderModel } from "../interfaces/folder-model.interface";
import { IFolder } from "../interfaces/folder.interface";

export class FolderModel extends RecordModel implements IFolderModel {

    public owner_id: number;
    public parent_id?: number;
    public name: string;
    public description: string;
    public owner: string;
    public parent?: string | undefined;
    public files: IFileModel[];
    public files_ids: number[]; 
    public tags_include: number[];   
    public tags_exclude: number[];
    public tags: {
        include: ITagModel[];
        exclude: ITagModel[];
    };

    constructor(folder: IFolder) {
        super(folder);

        this.owner_id = folder.ownerId;
        this.owner = folder.owner;
        this.parent_id = folder.parentId;
        this.parent = folder.parent;
        this.name = folder.name || '';
        this.description = folder.description || '';
        this.files = (folder.files || []).map((file) => new File(file).toModel());
        this.files_ids = this.files.map(({ id }) => id);
        this.tags_include = folder.tags.include.map(({ id }) => id);
        this.tags_exclude = folder.tags.exclude.map(({ id }) => id);
        this.tags = {
            include: folder.tags.include.map((tag) => new Tag(tag).toModel()),
            exclude: folder.tags.exclude.map((tag) => new Tag(tag).toModel())
        };
    }

    public export() {
        return {
            ...super.export(),
            owner_id: this.owner_id,
            parent_id: this.parent_id,
            name: this.name,
            description: this.description
        };
    }
}