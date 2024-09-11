
import { Container } from "inversify";

const CommonContainer = new Container();

// CommonContainer.bind<DatabaseService>(DatabaseService).toSelf();

export { CommonContainer };