import { Container } from "inversify";
import { HTTPServer } from "server-over-express";


import { AuthContainer } from "./auth";
import { AuthController } from "./auth/auth.controller";
import { ConfigurationContainer } from "./configuration";
import { HealthCheckContainer } from "./crosscutting/healt-check";
import { HealthCheckController } from "./crosscutting/healt-check/health-check.controller";
import { Response } from "./crosscutting/responses/response.class";
import { ConfigurationService } from "./configuration/services/configuration.service";

const App = class {
    public server: HTTPServer;

    constructor() {
        const start = new Date().getTime();

        // Containers
        const appContainer = Container.merge(ConfigurationContainer, HealthCheckContainer, AuthContainer);
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
        // Set controllers
        httpServer.controllers.add(healthCheckController);
        httpServer.controllers.add(authController);

        this.server = httpServer;

        console.log(`App started in ${new Date().getTime() - start}ms`);
    }
}

export { App };
