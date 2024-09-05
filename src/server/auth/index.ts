import { Container } from "inversify";

import { AuthController } from "./auth.controller";

const AuthContainer = new Container();

AuthContainer.bind<AuthController>(AuthController).toSelf();

export { AuthContainer };