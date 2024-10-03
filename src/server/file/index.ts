import { Container } from "inversify";

import { FileController } from "./controllers/file.controller";
import { FileRepository } from "./repository/file.repository";
import { FileService } from "./services/file.service";

const FileContainer = new Container();

FileContainer.bind<FileController>(FileController).toSelf();
FileContainer.bind<FileService>(FileService).toSelf();
FileContainer.bind<FileRepository>(FileRepository).toSelf();

export { FileContainer };