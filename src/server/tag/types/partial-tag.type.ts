import { IRecord } from "../../crosscutting/common/interfaces";
import { ITag } from "../interfaces";

export type PartialTag = Omit<ITag, keyof IRecord>;