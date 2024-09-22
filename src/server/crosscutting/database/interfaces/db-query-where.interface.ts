import { DbWhereOperands } from "../enums/db-where-operands.enum";
import { DbOperands } from "../enums/db-operands.enum";
export interface IDbQueryWhere<T> {
    A: keyof T;
    B: string;
    op: DbWhereOperands;
    union?: DbOperands;
    type?: string;
}