import { IRecord } from "../../crosscutting/common/interfaces";
import { IFolder } from "../interfaces";

export type PartialFolder = Omit<IFolder, keyof IRecord>;