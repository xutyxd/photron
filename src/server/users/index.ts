import { Container } from "inversify";

import { UsersController } from "./users.controller";

const UsersContainer = new Container();

UsersContainer.bind<UsersController>(UsersController).toSelf();

export { UsersContainer };