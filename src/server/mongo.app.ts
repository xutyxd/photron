
import { App } from "./app";
import { MongoDatabaseService } from "./crosscutting/database/services/mongo-database.service";

const app = new App();

const configuration = {
    uri: process.env.MONGODB_URI,
    database: process.env.MONGODB_DATABASE
};
// Set database
app.set.database(MongoDatabaseService, configuration);
// Override auth
app.set.auth();
// Start app
app.start();

export { app };