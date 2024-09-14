import { RecordModel } from "../../crosscutting/common/classes/record-model.class";
import { IFolderModel } from "../interfaces/folder-model.interface";
import { IFolder } from "../interfaces/folder.interface";

export class FolderModel extends RecordModel implements IFolderModel {

    public owner_id: number;
    public parent_id?: number;
    public name: string;
    public description: string;


    constructor(folder: IFolder) {
        super(folder);

        this.owner_id = folder.ownerId;
        this.parent_id = folder.parentId;
        this.name = folder.name || '';
        this.description = folder.description || '';
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