import { Entity } from "../../crosscutting/common/classes";
import { File } from "../../file/classes";
import { IFileData } from "../../file/interfaces/data";
import { Folder } from "../../folder/classes";
import { IFolderData } from "../../folder/interfaces/data";
import { IDirectoryAPIData, IDirectoryData, IDirectoryModelData } from "../interfaces/data";
import { IDirectory } from "../interfaces/dto";

export class Directory extends Entity implements IDirectory {

    public folders: IFolderData[];
    public files: IFileData[];

    constructor(data: Partial<IDirectoryData>) {
        super(data);

        this.folders = data.folders || [];
        this.files = data.files || [];
    }

    public toApi() {
        const base = super.toApi();
        const folders = this.folders.map((folder) => new Folder(folder).toApi());
        const files = this.files.map((file) => new File(file).toApi());

        return {
            ...base,
            folders,
            files
        };
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            folders: this.folders,
            files: this.files
        };
    }

    public toModel() {
        const base = super.toModel();
        const folders = this.folders.map((folder) => new Folder(folder).toModel());
        const files = this.files.map((file) => new File(file).toModel());

        return {
            ...base,
            folders,
            files
        };
    }

    public static fromAPI(entity: IDirectoryAPIData) {
        const base = super.fromAPI(entity);
        const folders = entity.folders.map((folder) => Folder.fromAPI(folder).toDomain());
        const files = entity.files.map((file) => File.fromAPI(file).toDomain());

        return new Directory({
            ...base,
            folders,
            files
        });
    }

    public static fromModel(entity: IDirectoryModelData) {
        const base = super.fromModel(entity);
        const folders = entity.folders.map((folder) => Folder.fromModel(folder).toDomain());
        const files = entity.files.map((file) => File.fromModel(file).toDomain());

        return new Directory({
            ...base,
            folders,
            files
        });
    }
}
