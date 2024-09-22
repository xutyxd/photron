import 'reflect-metadata';

import { Container } from "inversify";
import { HTTPServer } from "server-over-express";

import { AuthContainer } from "./auth";
import { SetAuthAction } from "./auth/actions/set-auth.action";
import { AuthController } from "./auth/controllers/auth.controller";
import { ConfigurationContainer } from "./configuration";
import { ConfigurationService } from "./configuration/services/configuration.service";
import { CommonContainer } from './crosscutting/common';
import { IRecordModel } from './crosscutting/common/interfaces/record-model.interface';
import { Response } from "./crosscutting/common/responses/response.class";
import { IDatabase } from './crosscutting/database/interfaces/database.interface';
import { MemoryDatabaseService } from './crosscutting/database/services/memory-database.service';
import { HealthCheckContainer } from "./crosscutting/healt-check";
import { HealthCheckController } from "./crosscutting/healt-check/health-check.controller";
import { FolderContainer } from './folder';
import { FolderController } from './folder/controllers/folder.controller';
import { TagContainer } from './tag';
import { TagController } from './tag/controllers/tag.controller';

const App = class {
    public server: HTTPServer;

    constructor() {
        const start = new Date().getTime();

        // Containers
        const [container, ...containers] = [
            ConfigurationContainer,
            HealthCheckContainer,
            AuthContainer,
            CommonContainer,
            FolderContainer,
            TagContainer,
        ];
        // Merge containers
        const appContainer = Container.merge(container, ...containers);
        // Skip base class checks
        appContainer.options = { skipBaseClassChecks: true };
        // Actions
        // Actions pre-request
        const setAuthAction = appContainer.get(SetAuthAction);
        // Services
        const configurationService = appContainer.get(ConfigurationService);
        // Set database
        appContainer.bind<IDatabase<unknown & IRecordModel>>('IDatabase').to(MemoryDatabaseService).inSingletonScope();
        // Get database
        const databaseService = appContainer.get<IDatabase<unknown & IRecordModel>>('IDatabase');
        databaseService.connection.open();
        // Controllers
        const healthCheckController = appContainer.get(HealthCheckController);
        const authController = appContainer.get(AuthController);
        const folderController = appContainer.get(FolderController);
        const tagController = appContainer.get(TagController);

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
        httpServer.controllers.add(folderController);
        httpServer.controllers.add(tagController);

        this.server = httpServer;

        console.log(`App started in ${new Date().getTime() - start}ms`);
    }
}

export { App };
