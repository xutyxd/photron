import { RecordModel } from "../../crosscutting/common/classes/record-model.class";
import { IFolderModel } from "../interfaces/folder-model.interface";
import { IFolder } from "../interfaces/folder.interface";

export class FolderModel extends RecordModel implements IFolderModel {

    public owner_id: number;
    public parent_id?: number;
    public name: string;
    public description: string;
    public test = 'test';


    constructor(folder: IFolder) {
        super(folder);

        this.owner_id = folder.ownerId;
        this.parent_id = folder.parentId;
        this.name = folder.name || '';
        this.description = folder.description || '';
    }
}