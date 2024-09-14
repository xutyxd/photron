import { inject, injectable } from "inversify";
import { IDatabase } from "../../crosscutting/common/interfaces/database.interface";
import { IFolder } from "../interfaces/folder.interface";
import { IFolderModel } from "../interfaces/folder-model.interface";
import { IRepository } from "../../crosscutting/common/interfaces/repository.interface";

@injectable()
export class FolderRepository implements IRepository<IFolder, IFolderModel> {

    private table = 'folders';

    constructor(@inject('IDatabase') private readonly dataBaseService: IDatabase<IFolderModel>) { }

    public async insert(folder: IFolderModel) {
        return this.dataBaseService.insert(this.table, folder);
    }

    public async get(id: IFolder['id']) {
        return this.dataBaseService.get(this.table, id);
    }

    public async list(where?: string[]) {
        return this.dataBaseService.list(this.table, where = []);
    }

    public async update(id: IFolder['id'], folder: Partial<IFolder>) {
        return this.dataBaseService.update(this.table, id, folder);
    }

    public async delete(id: IFolder['id']) {
        return this.dataBaseService.delete(this.table, id);
    }
}