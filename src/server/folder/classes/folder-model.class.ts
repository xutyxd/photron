import { RecordModel } from "../../crosscutting/common/classes/record-model.class";
import { IFolderModel } from "../interfaces/folder-model.interface";
import { IFolder } from "../interfaces/folder.interface";

export class FolderModel extends RecordModel implements IFolderModel {

    public owner_id: number;
    public parent_id?: number;
    public name: string;
    public description: string;
    public owner: string;
    public parent?: string | undefined;
    public files_ids: number[];
    public files: unknown[];


    constructor(folder: IFolder) {
        super(folder);

        this.owner_id = folder.ownerId;
        this.owner = folder.owner;
        this.parent_id = folder.parentId;
        this.parent = folder.parent;
        this.name = folder.name || '';
        this.description = folder.description || '';
        this.files_ids = folder.filesIds || [];
        this.files = folder.files || [];
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