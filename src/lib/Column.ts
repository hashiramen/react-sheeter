const uniqid = require('uniqid');

export interface IColumnDefinition {
    uniq: string;
    name: string;
    mandatory: boolean;
    alwaysVisibleInSheet: boolean;
    type: string;
}

export class Column implements IColumnDefinition {
    uniq: string;
    name: string;
    mandatory: boolean;
    alwaysVisibleInSheet: boolean;
    type: string;
    constructor(  _name: string, _type: string, _mandatory: boolean, _alwaysVisibleInSheet: boolean ) {
        this.name = _name;
        this.type = _type;
        this.mandatory = _mandatory;
        this.alwaysVisibleInSheet = _alwaysVisibleInSheet;
        this.uniq = uniqid();
    }
}