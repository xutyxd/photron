import { Container } from "inversify";

import { HealthCheckController } from "./health-check.controller";

const HealthCheckContainer = new Container();

HealthCheckContainer.bind<HealthCheckController>(HealthCheckController).toSelf();

export { HealthCheckContainer };