
import { Container } from "inversify";
import { LogService } from "./services/log.service";

const CommonContainer = new Container();

CommonContainer.bind<LogService>(LogService).toSelf().inSingletonScope();

export { CommonContainer };