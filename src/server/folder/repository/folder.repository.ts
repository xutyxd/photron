import { inject, injectable } from "inversify";
import { IDatabase } from "../../crosscutting/common/interfaces/database.interface";
import { IRecord } from "../../crosscutting/common/interfaces/record.interface";
import { IFolder } from "../interfaces/folder.interface";
import { Optional } from "../../crosscutting/common/types/optional.type";
import { Folder } from "../classes/folder.class";
import { FolderModel } from "../classes/folder-model.class";
import { IFolderModel } from "../interfaces/folder-model.interface";

@injectable()
export class FolderRepository {

    private table = 'folders';

    constructor(@inject('IDatabase') private readonly dataBaseService: IDatabase<IFolderModel>) { }

    public async insert(folder: Folder) {
        return this.dataBaseService.insert(this.table, folder.toModel());
    }

    public async get(id: IFolder['id']) {
        return this.dataBaseService.get(this.table, id);
    }

    public async update(id: IFolder['id'], folder: Partial<IFolder>) {
        return this.dataBaseService.update(this.table, id, folder);
    }

    public async delete(id: IFolder['id']) {
        return this.dataBaseService.delete(this.table, id);
    }
}