import { EntityAPI } from "../../crosscutting/common/classes";
import { IFileAPIData } from "../interfaces/data";
import { IFileAPI } from "../interfaces/dto";
import { File } from "./file.class";

export class FileAPI extends EntityAPI implements IFileAPI {

    public ownerIndex: string;
    public name: string;
    public description?: string;
    public size: number;
    public type: string;
    public tags: string[];

    constructor(file: IFileAPIData) {
        super(file);

        this.ownerIndex = file.ownerIndex;
        this.name = file.name;
        this.description = file.description;
        this.size = file.size;
        this.type = file.type;
        this.tags = file.tags || [];
    }

    public toApi = () => {
        const base = super.toApi();
        
        return {
            ...base,
            ownerIndex: this.ownerIndex,
            name: this.name,
            description: this.description,
            size: this.size,
            type: this.type,
            tags: this.tags
        };
    }

    public toDomain() {
        return new File(this).toDomain();
    }

    public static fromDomain(entity: IFileAPIData): FileAPI {
        return new FileAPI(entity);
    }
}