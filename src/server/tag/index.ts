import { Container } from "inversify";

import { TagController } from "./controllers/tag.controller";
import { TagRepository } from "./repository/tag.repository";
import { TagService } from "./services/tag.service";

const TagContainer = new Container();

TagContainer.bind<TagController>(TagController).toSelf();
TagContainer.bind<TagService>(TagService).toSelf();
TagContainer.bind<TagRepository>(TagRepository).toSelf();

export { TagContainer };
