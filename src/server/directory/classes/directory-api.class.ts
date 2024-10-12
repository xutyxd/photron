import { EntityAPI } from "../../crosscutting/common/classes";
import { File } from "../../file/classes";
import { IFileAPIData } from "../../file/interfaces/data";
import { Folder } from "../../folder/classes";
import { IFolderAPIData } from "../../folder/interfaces/data";
import { IDirectoryAPIData, IDirectoryData } from "../interfaces/data";
import { IDirectoryAPI } from "../interfaces/dto";

export class DirectoryAPI extends EntityAPI implements IDirectoryAPI {
    
    public folders: IFolderAPIData[];
    public files: IFileAPIData[];

    constructor(data: IDirectoryAPIData) {
        super(data);

        this.folders = data.folders;
        this.files = data.files;
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            folders: this.folders,
            files: this.files
        };
    }

    public toDomain() {
        const base = super.toDomain();
        const folders = this.folders.map((folder) => Folder.fromAPI(folder).toDomain());
        const files = this.files.map((file) => File.fromAPI(file).toDomain());

        return {
            ...base,
            folders,
            files,
        };
    }

    public static fromDomain(entity: IDirectoryData) {
        return new DirectoryAPI({ ...entity });
    }
}
