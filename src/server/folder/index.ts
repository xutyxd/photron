import { Container } from "inversify";

import { FolderController } from "./controllers/folder.controller";
import { FolderRepository } from "./repository/folder.repository";
import { FolderService } from "./services/folder.service";

const FolderContainer = new Container();

FolderContainer.bind<FolderController>(FolderController).toSelf();
FolderContainer.bind<FolderService>(FolderService).toSelf();
FolderContainer.bind<FolderRepository>(FolderRepository).toSelf();

export { FolderContainer, FolderController };
