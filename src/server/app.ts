import { Container } from "inversify";
import { HTTPServer } from "server-over-express";

import { AuthContainer } from "./auth";
import { SetAuthAction } from "./auth/actions/set-auth.action";
import { AuthController } from "./auth/auth.controller";
import { ConfigurationContainer } from "./configuration";
import { ConfigurationService } from "./configuration/services/configuration.service";
import { HealthCheckContainer } from "./crosscutting/healt-check";
import { HealthCheckController } from "./crosscutting/healt-check/health-check.controller";
import { Response } from "./crosscutting/responses/response.class";

const App = class {
    public server: HTTPServer;

    constructor() {
        const start = new Date().getTime();

        // Containers
        const appContainer = Container.merge(ConfigurationContainer, HealthCheckContainer, AuthContainer);
        // Actions
        // Actions pre-request
        const setAuthAction = appContainer.get(SetAuthAction);
        // Services
        const configurationService = appContainer.get(ConfigurationService);
        // Controllers
        const healthCheckController = appContainer.get(HealthCheckController);
        const authController = appContainer.get(AuthController);
        const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
        const httpServer = new HTTPServer(port, Response);
        // Set API to be able to call it from anywhere
        httpServer.headers.add({
            key: "Access-Control-Allow-origin",
            value: "*"
        });
        // Set keys for cookies
        httpServer.keys = configurationService.keys.cookies;
        // Set actions
        // Set actions before request
        httpServer.request.before.add(setAuthAction);
        // Set actions after request
        // Set controllers
        httpServer.controllers.add(healthCheckController);
        httpServer.controllers.add(authController);

        this.server = httpServer;

        console.log(`App started in ${new Date().getTime() - start}ms`);
    }
}

export { App };
