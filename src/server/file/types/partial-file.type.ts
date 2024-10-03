import { IRecord } from "../../crosscutting/common/interfaces";
import { IFile } from "../interfaces/file.interface";

export type PartialFile = Omit<IFile, keyof IRecord>;