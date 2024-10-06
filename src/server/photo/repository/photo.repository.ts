import { inject, injectable } from "inversify";
import { EntityRepositoryService } from "../../crosscutting/common";
import { IDatabase } from "../../crosscutting/database/interfaces";
import { PhotoModel } from "../classes";
import { IPhotoData, IPhotoModelData } from "../interfaces/data";

@injectable()
export class PhotoRepository extends EntityRepositoryService<IPhotoData, IPhotoModelData> {

    constructor(@inject('IDatabase') readonly dataBaseService: IDatabase<IPhotoModelData>) {
        const table = 'photos';
        super(dataBaseService, table, PhotoModel);
    }
}