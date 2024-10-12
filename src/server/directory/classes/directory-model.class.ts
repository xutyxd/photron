import { EntityModel } from "../../crosscutting/common/classes";
import { File } from "../../file/classes";
import { IFileModelData } from "../../file/interfaces/data";
import { Folder } from "../../folder/classes";
import { IFolderModelData } from "../../folder/interfaces/data";
import { IDirectoryData, IDirectoryModelData } from "../interfaces/data";
import { IDirectoryModel } from "../interfaces/dto";

export class DirectoryModel extends EntityModel implements IDirectoryModel {

    public folders: IFolderModelData[];
    public files: IFileModelData[];

    constructor(data: IDirectoryModelData) {
        super(data);

        this.folders = data.folders;
        this.files = data.files;
    }

    public toDomain() {
        const base = super.toDomain();
        const folders = this.folders.map((folder) => Folder.fromModel(folder).toDomain());
        const files = this.files.map((file) => File.fromModel(file).toDomain());

        return {
            ...base,
            folders,
            files,
        };
    }

    public toRepository() {
        const base = super.toRepository();

        return {
            ...base,
            folders: this.folders,
            files: this.files
        };
    }

    public static fromDomain(entity: IDirectoryData) {
        const base = super.fromDomain(entity);
        const folders = entity.folders.map((folder) => new Folder(folder).toModel());
        const files = entity.files.map((file) => new File(file).toModel());

        return new DirectoryModel({
            ...base,
            folders,
            files
        });
    }

    public static fromRepository(entity: IDirectoryModelData) {
        const base = super.fromRepository(entity);

        return new DirectoryModel({
            ...base,
            folders: entity.folders,
            files: entity.files
        });
    }
}
