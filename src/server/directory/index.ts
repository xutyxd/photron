import { Container } from "inversify";

import { DirectoryController } from "./controllers/directory.controller";
import { DirectoryRepository } from "./repository/directory.repository";
import { DirectoryService } from "./services/directory.service";

const DirectoryContainer = new Container();

DirectoryContainer.bind<DirectoryController>(DirectoryController).toSelf();
DirectoryContainer.bind<DirectoryService>(DirectoryService).toSelf();
DirectoryContainer.bind<DirectoryRepository>(DirectoryRepository).toSelf();

export { DirectoryContainer, DirectoryController };