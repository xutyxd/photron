
import { App } from "./app";

const app = new App();

app.set.database();
app.set.auth();
app.start();

export { app };