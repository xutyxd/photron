import { Container } from "inversify";
import { HTTPServer } from "server-over-express";


import { Response } from "./crosscutting/responses/response.class";
import { HealthCheckContainer } from "./crosscutting/healt-check";
import { HealthCheckController } from "./crosscutting/healt-check/health-check.controller";
import { AuthContainer } from "./auth";
import { AuthController } from "./auth/auth.controller";

const App = class {
    public server: HTTPServer;

    constructor() {
        const start = new Date().getTime();

        // Containers
        const appContainer = Container.merge(HealthCheckContainer, AuthContainer);
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


        httpServer.controllers.add(healthCheckController);
        httpServer.controllers.add(authController);

        this.server = httpServer;

        console.log(`App started in ${new Date().getTime() - start}ms`);
    }
}

export { App }