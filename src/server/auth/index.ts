import { Container } from "inversify";

import { AuthController } from "./auth.controller";
import { AuthService } from "./services/auth.service";
import { SetAuthAction } from "./actions/set-auth.action";

const AuthContainer = new Container();

AuthContainer.bind<SetAuthAction>(SetAuthAction).toSelf();
AuthContainer.bind<AuthController>(AuthController).toSelf();
AuthContainer.bind<AuthService>(AuthService).toSelf();

export { AuthContainer };
