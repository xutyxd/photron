
import { Container } from "inversify";

import { FolderController } from "./controllers/folder.controller";
import { FolderService } from "./services/folder.service";
import { FolderRepository } from "./repository/folder.repository";

const FolderContainer = new Container();

FolderContainer.bind<FolderController>(FolderController).toSelf();
FolderContainer.bind<FolderService>(FolderService).toSelf();
FolderContainer.bind<FolderRepository>(FolderRepository).toSelf();

export { FolderContainer };