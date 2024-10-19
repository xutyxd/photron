import { Container } from "inversify";

import { DirectoryController } from "./controllers/directory.controller";
import { DirectoryService } from "./services/directory.service";

const DirectoryContainer = new Container();

DirectoryContainer.bind<DirectoryController>(DirectoryController).toSelf();
DirectoryContainer.bind<DirectoryService>(DirectoryService).toSelf();

export { DirectoryContainer, DirectoryController };
