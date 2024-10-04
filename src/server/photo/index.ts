import { Container } from "inversify";

import { PhotoController } from "./controllers/photo.controller";
import { PhotoRepository } from "./repository/photo.repository";
import { PhotoService } from "./services/photo.service";

const PhotoContainer = new Container();

PhotoContainer.bind<PhotoController>(PhotoController).toSelf();
PhotoContainer.bind<PhotoService>(PhotoService).toSelf();
PhotoContainer.bind<PhotoRepository>(PhotoRepository).toSelf();

export { PhotoContainer, PhotoController };