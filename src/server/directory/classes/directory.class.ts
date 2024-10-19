import { File } from "../../file/classes";
import { IFileData } from "../../file/interfaces/data";
import { Folder } from "../../folder/classes";
import { IFolderData } from "../../folder/interfaces/data";
import { IDirectoryAPIData, IDirectoryData, IDirectoryModelData } from "../interfaces/data";
import { IDirectory } from "../interfaces/dto";

export class Directory implements IDirectory {

    public folders: IFolderData[];
    public files: IFileData[];

    constructor(data: Partial<IDirectoryData>) {
        this.folders = data.folders || [];
        this.files = data.files || [];
    }

    public toApi() {
        const folders = this.folders.map((folder) => new Folder(folder).toApi());
        const files = this.files.map((file) => new File(file).toApi());

        return {
            folders,
            files
        };
    }

    public toDomain() {
        return {
            folders: this.folders,
            files: this.files
        };
    }

    public toModel() {
        const folders = this.folders.map((folder) => new Folder(folder).toModel());
        const files = this.files.map((file) => new File(file).toModel());

        return {
            folders,
            files
        };
    }

    public static fromAPI(entity: IDirectoryAPIData) {
        const folders = entity.folders.map((folder) => Folder.fromAPI(folder).toDomain());
        const files = entity.files.map((file) => File.fromAPI(file).toDomain());

        return new Directory({
            folders,
            files
        });
    }

    public static fromModel(entity: IDirectoryModelData) {
        const folders = entity.folders.map((folder) => Folder.fromModel(folder).toDomain());
        const files = entity.files.map((file) => File.fromModel(file).toDomain());

        return new Directory({
            folders,
            files
        });
    }
}
