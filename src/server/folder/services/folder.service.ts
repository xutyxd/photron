import { inject, injectable } from "inversify";
import { IRecord } from "../../crosscutting/common/interfaces/record.interface";
import { Folder } from "../classes/folder.class";
import { IFolder } from "../interfaces/folder.interface";
import { FolderRepository } from "../repository/folder.repository";

@injectable()
export class FolderService {

    constructor(@inject(FolderRepository) private readonly folderRepository: FolderRepository) { }

    public async create(folder: Omit<IFolder, keyof IRecord>): Promise<Folder> {
        let folderCreated: Folder;

        try {
            const toInsert = new Folder(folder);
            // Insert the folder in the database
            const folderInserted = await this.folderRepository.insert(toInsert);
            // Create a new folder instance
            folderCreated = Folder.fromModel(folderInserted);
        } catch (error) {
            console.log('Error creating folder: ', error);
            throw new Error('Error creating folder');
        }

        return folderCreated;
    }

    public async get(id: IFolder['id']) {
        let folder: Folder | undefined;

        try {
            // Get the folder from the database
            const folderFounded = await this.folderRepository.get(id);
            // Create a new folder instance
            folder = folderFounded && Folder.fromModel(folderFounded);
        } catch (error) {
            console.log('Error getting folder: ', error);
            throw new Error('Error getting folder');
        }

        return folder;
    }

    public async update(id: IFolder['id'], update: Partial<IFolder>) {
        let folder: Folder | undefined;

        try {
            // Update the folder in the database
            const folderUpdated = await this.folderRepository.update(id, update);
            // Create a new folder instance
            folder = folderUpdated && Folder.fromModel(folderUpdated);
        } catch (error) {
            console.log('Error updating folder: ', error);
            throw new Error('Error updating folder');
        }

        return folder;
    }

    public async delete(id: IFolder['id']) {
        let folder: Folder | undefined;

        try {
            // Delete the folder from the database
            const folderDeleted = await this.folderRepository.delete(id);
            // Create a new folder instance
            folder = folderDeleted && Folder.fromModel(folderDeleted);
        } catch (error) {
            console.log('Error deleting folder: ', error);
            throw new Error('Error deleting folder');
        }

        return folder;
    }
}