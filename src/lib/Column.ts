import { IValidateTypeResult } from "./validator";
const uniqid = require("uniqid");

export enum ColumnRole {
    None = 0,
    Key = 1,
    RefKey = 2,
}

export interface IColumnDefinition {
    uniq: string;
    parentSheet: string;
    name: string;
    type: string;
    specificValidations: Array<( _value: any ) => IValidateTypeResult>;
    role: ColumnRole;
    refSheet: string;
    refColumn: string;
}

export class Column implements IColumnDefinition {
    parentSheet: string;
    role: ColumnRole;
    refSheet: string;
    refColumn: string;
    uniq: string;
    name: string;
    mandatory: boolean;
    alwaysVisibleInSheet: boolean;
    type: string;
    specificValidations: Array<( _value: any ) => IValidateTypeResult>;
    constructor( _parentSheet: string, _name: string, _type: string, _specificValidations: Array<( _value: any ) => IValidateTypeResult> = [], _role: ColumnRole = ColumnRole.None, _refSheet: string = "", _refColumn: string = "") {
        this.parentSheet = _parentSheet;
        this.name = _name;
        this.type = _type;
        this.uniq = uniqid();
        this.specificValidations = _specificValidations;

        this.role = _role;
        this.refSheet = _refSheet;
        this.refColumn = _refColumn;
    }
}
