import { IValidateTypeResult } from "./validator";
const uniqid = require('uniqid');

export interface IColumnDefinition {
    uniq: string;
    name: string;
    mandatory: boolean;
    alwaysVisibleInSheet: boolean;
    type: string;
    specificValidations: Array<( _value: any ) => IValidateTypeResult>;
}

export class Column implements IColumnDefinition {
    uniq: string;
    name: string;
    mandatory: boolean;
    alwaysVisibleInSheet: boolean;
    type: string;
    specificValidations: Array<( _value: any ) => IValidateTypeResult>;
    constructor(  _name: string, _type: string, _mandatory: boolean, _alwaysVisibleInSheet: boolean, _specificValidations: Array<( _value: any ) => IValidateTypeResult> = []) {
        this.name = _name;
        this.type = _type;
        this.mandatory = _mandatory;
        this.alwaysVisibleInSheet = _alwaysVisibleInSheet;
        this.uniq = uniqid();
        this.specificValidations = _specificValidations;
    }
}