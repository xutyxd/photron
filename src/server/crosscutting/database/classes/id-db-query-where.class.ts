import { IRecordModel } from "../../common/interfaces";
import { DbWhereOperands } from "../enums/db-where-operands.enum";
import { IIndexDbQueryWhere } from "../interfaces";

export class IDDbQueryWhere<T extends IRecordModel> implements IIndexDbQueryWhere<T> {

    public A = 'id ' as keyof T;
    public B: number;
    public op: DbWhereOperands.EQUALS = DbWhereOperands.EQUALS;

    constructor(B: number) {
        this.B = B;
    }
}