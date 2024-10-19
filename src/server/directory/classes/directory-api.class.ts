import { File } from "../../file/classes";
import { IFileAPIData } from "../../file/interfaces/data";
import { Folder } from "../../folder/classes";
import { IFolderAPIData } from "../../folder/interfaces/data";
import { IDirectoryAPIData, IDirectoryData } from "../interfaces/data";
import { IDirectoryAPI } from "../interfaces/dto";

export class DirectoryAPI implements IDirectoryAPI {
    
    public folders: IFolderAPIData[];
    public files: IFileAPIData[];

    constructor(data: IDirectoryAPIData) {

        this.folders = data.folders;
        this.files = data.files;
    }

    public toApi() {

        return {
            folders: this.folders,
            files: this.files
        };
    }

    public toDomain() {
        const folders = this.folders.map((folder) => Folder.fromAPI(folder).toDomain());
        const files = this.files.map((file) => File.fromAPI(file).toDomain());

        return {
            folders,
            files,
        };
    }

    public static fromDomain(entity: IDirectoryData) {
        return new DirectoryAPI({ ...entity });
    }
}
